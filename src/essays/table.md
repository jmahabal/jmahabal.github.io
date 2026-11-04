---
title: 'Table'
draft: true
---

![Example of a grouped data table showing food items organized by type, with filtering and grouping controls](/table-example.png)

## Background

At Lattice, we had two observations: product teams gave feedback that our existing table component was hard to add additional features to, and when product teams did add functionality on top of the component, they were duplicating efforts.

This was a perfect opportunity for a platform team to provide a good abstraction. An abstracted component could also enforce best practices and enable otherwise nice-to-have features like analytics tracking.

We also had multiple table components (`design-system/Table`, `components/ListTable`) with different APIs, which created confusion for developers.

## Bake-off

Our first question was whether we needed to introduce a new component or we could refactor our existing one.

If you create a new component, you need to account for the migration from the old to the new, which is usually a lot harder than it seems. You also introduce the risk of an unfinished migration if priorities change. Having two systems is a lot harder to maintain, so migrating in place is preferred. Some cases in which you might want a new component include when the API or usage of the component is changing so significantly that the work required to refactor would just not be worth it.

When we decided to build a new component, we prototyped recreating simple existing tables with a few different libraries to evaluate their documentation, DX, and flexibility. We evaluated several options including `fixed-data-table-2`, `react-table`, and `chakra/table` before landing on TanStack Table.

It was a major version upgrade from our existing `react-table` dependency, which simplified the migration path. Cons: it requires you to invest some time in setting up the UI (it’s headless), but we had time and resources. However, this does mean we have a migration now!

## Rollout

One problem design systems teams have is adoption: you build what you think is a great component, and it might be great in a vacuum, but product teams still don’t use it, maybe because it doesn’t quite meet their needs, or because the effort involved in migrating isn’t worth the cost. These are different problems, and so they would need different solutions!

For the former, we aligned our milestones with product team launches. So as we built out functionality, there was a product team attached each time.

- Milestone 1 (Foundation): Simple table — our team already had a table that we owned for this
- Milestone 2 (Basic features): Admin > Reviews > Templates table
- Milestone 3 (Advanced features): Admin > Compensation > Benchmarking table
- Milestone 4 (Enhancements): Net-new features like row grouping

This process also meant we were spreading context and knowledge to teams!

## Executive Alignment

This experience is an example of when I changed my mind. Previously, I thought that Design System teams needed to be in platform orgs because they were, well, a platform. I thought the failure mode for them being in product orgs would be that they would solve for that specific team instead of for a generalized solution.

But when my team was moved into a product org, I discovered that the close alignment was actually an asset! Not only were we closer to our customers and therefore able to react to feedback in a faster cycle, but our LCM (least common manager) was much lower and could force alignment, like tying DS outcomes to product outcomes!

Ultimately, DS exists to achieve business goals, not to build pure components or live in the "right" location. Align yourselves with tailwinds by finding the champions in your org, and don’t worry too much about org structure.

## Technical Bits

### Guiding Principles

Consumers own state. From our experiences with other components, we know how difficult it gets when we try to magic state away. So we split data fetching / state / UI but provided documentation for the way to tie them together. When you abstract state too much, you end up with a component that’s harder to use and understand. By keeping state management explicit, you give developers the flexibility they need while maintaining clarity.

### State

```tsx
const { table } = useTable()

<Table table={table} />
```

This lets us also use the data for, say, a data visualization on top of a table.

```tsx
// ✅ Explicit state management

const [sorting, setSorting] = useState<SortingState>({
  id: 'name',
  desc: false,
})
const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 50,
})

const table = useDataTable({
  columns,
  data,
  state: { sorting, pagination },
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
})
```

### Composition

Instead of a monolithic `<Table />` with a bunch of props (which leads to prop bloat), we split it up and made you import + pass in the content. This means it’s trivial to do something like stripe rows yourself — you’re not blocked by the DS team and don’t have to create `rowClassName` or anything.

```tsx
// ❌ Monolithic approach with potential for prop bloat

<Table
  data={data}
  rowClassNamesCallback={(data, index) => {
    return index % 2 === 0 ? "bg-gray-400" : "bg-white"
  }}
/>

// ✅ Compositional approach

<DataTable {...table}>
  <DataTable.Body>
    {table.getRows().map((row, index) => (
      <DataTable.Row
        key={row.id}
        row={row}
        className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
      />
    ))}
  </DataTable.Body>
</DataTable>
```

You maintain the expressiveness of JSX. Extending the table to include controls is similarly straightforward:

```tsx
<DataTable.Wrapper>
  <DataTable.Controls>
    <DataTable.Search />
    <DataTable.ColumnVisibility />
  </DataTable.Controls>

  <DataTable {...table} />

  <DataTable.Controls>
    <DataTable.Pagination />
  </DataTable.Controls>
</DataTable.Wrapper>
```

We got feedback that some teams did want a `SimpleTable` — so we also built this version. The balance was that if you wanted anything even a little more, you’d have to split it into the composed components.

```tsx
// ✅ Simple use case - just pass data and columns

<SimpleTable columns={columns} data={data} />

// ✅ Complex use case - full control over structure

<DataTable {...table}>
  <DataTable.Head />
  <DataTable.Body />
  <DataTable.Controls>
    <DataTable.Pagination />
  </DataTable.Controls>
</DataTable>
```

### Accessibility

I won’t speak too much here (I’m not an expert; tables are hard). One thing that I do think was a clever solution was our approach to a requirement for the table rows to be clickable.

You can’t have nested interactive content (so like buttons in the clickable table row). Rather than force through a11y to its exact specifications at the cost of confusing code (like many clickable card implementations), we reframed it.

A11y is not just about equality; it’s also about equity. What I mean by that is that there is a reason nested interactive content is bad. If we add an `onClick` to the row that screen readers wouldn’t know about but that sighted users would, that’s functionality they can’t access. But if we have a button in the row that does the same thing as the `onClick`, screen readers can still get there.

### Built-in Analytics

We also got to implement user analytics (when a user paginated, etc.) into the table. The most basic operations were batteries-included, and we provided a way to extend "table actions" to other actions that may be custom to an implementation.

These small bits of functionality that might get cut when up against a deadline are now provided for free. That’s the power of building on a strong, shared platform!

## Evaluation

Initial feedback was positive. We migrated a few tables ourselves, which was good — a great way to kick the tires. I see the tables when I log into Lattice at my new job.

## What Could Have Gone Better

Aligning milestones was a great idea, and I’d do it again. However, I think we over-indexed on those milestones. We provided white-glove service in a way that did in fact prioritize a single product team over others. The consequence is that when we stopped providing that service, there wasn’t as much urgency as we expected.

## Reflections from MT

Sometimes backend engineers just want to be able to pass in one argument and have the table. They don’t want to make decisions. So lean more into something like `SimpleTable`. There’s also the power of forcing a way to do things, vs. "trusting" product teams and not providing a way — plus, you avoid inconsistency off the bat!

For example, at MT we had a super powerful way to open an entity detail view on pretty much any table. Maybe we should have made the data fetching → table UI even more frictionless and opt-out.
