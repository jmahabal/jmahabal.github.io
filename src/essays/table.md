---
title: 'Table'
date: '2025-08-19'
draft: true
---

![Example of a grouped data table showing food items organized by type, with filtering and grouping controls](/table-example.png)

## Background

- Product teams gave us two key pieces of feedback: our existing table component was hard to extend, and teams were duplicating work when adding new features.
- This was a perfect opportunity for a platform team to provide a good abstraction.
- An abstracted component could also enforce best practices and enable otherwise nice-to-have features like analytics tracking.

## The Scale of the Problem

Before diving into solutions, let's understand the scope. Tables weren't just another component — they were one of our most-used design elements across the entire product. We found many table features that teams were implementing independently:

- Headers and sub-headers
- Column sorting and filtering
- Row multi-select & bulk actions
- Pagination
- Sticky headers and columns
- Column visibility controls
- Row grouping
- Column resizing

Each product team was building their own table implementation, leading to inconsistent user experiences and massive code duplication. We also had multiple table components (`design-system/Table`, `components/ListTable`) with different APIs, creating confusion for developers.

## Decision Making: New Component vs. Refactor

### The Bake-off Process

- Our first decision was whether we needed to introduce a new component or if we could refactor our existing one (preferred).
- If you create a new component, you need to plan for migration from old to new, which is usually harder than it seems.
- You also risk an unfinished migration if priorities change. Having two systems is harder to maintain, so incremental change is preferred.
- You might want a new component when the API or usage is changing so significantly that refactoring wouldn't be worth it.

### Third-Party Library Evaluation

Rather than building everything from scratch, we evaluated existing table libraries. This wasn't just a quick comparison - we actually prototyped recreating simple existing tables with different libraries to evaluate their documentation, developer experience, and flexibility.

We evaluated several options including `fixed-data-table-2`, `react-table` (v7), and `chakra/table`. The outcome was that we'd use Tanstack Table (the successor to react-table v7).

Why Tanstack Table?

- Strong TypeScript support and widespread industry adoption
- Extremely flexible and configurable for future needs
- Major version upgrade from our existing `react-table` dependency, simplifying migration
- Headless architecture that gives us full control over styling and behavior

The trade-off: Tanstack Table requires time to set up the UI (it's headless), but we had the resources to build opinionated components on top. This gave us the best of both worlds - a battle-tested foundation with complete design control.

However, this did mean we now had a migration challenge to solve!

## Technical Implementation

### Guiding Principles

**Consumers Control State**

One of our most important decisions was that consumers own state. This principle came from hard-learned lessons with other components where we tried to "magic away" state management.

When you abstract state too much, you end up with a component that's harder to use and understand. By keeping state management explicit, you give developers the flexibility they need while maintaining clarity. This also enables use cases like using the same data for both a table and a data visualization.

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

**Lean into JSX and Composition**

Instead of a monolithic `<Table />` with many props (which leads to prop bloat), we split it up and make you import and pass in the content. This makes it much easier to work with the internals of the component.

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

You maintain the expressiveness of JSX and you're not blocked by the DS team or have to add props to the main component.

Extending the table to include controls is similarly straightforward:

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

This approach provides several benefits:

### SimpleTable Pattern

We got feedback that developers want a simple table without all the complexity. For these cases, we tried to provide a `SimpleTable`:

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

This pattern acknowledges that not every table needs the full flexibility of the compositional approach and provides a simpler API for basic use cases.

### Accessibility Considerations

- I won't speak too much here (I'm not an expert; tables are hard) besides that we tried our best.
- One clever solution was our approach to making table rows clickable (sometimes opening in a new tab, sometimes not).
- You can't have nested interactive content like buttons in a clickable table row.
- Rather than force a11y to its exact specifications at the cost of confusing code, we reframed it.
- A11y is not about equality. It's about equity. There's a reason nested interactive content is bad.
- Add an `onClick` to the row that screen readers wouldn't know about but sighted users would.
- Have a button in the row that does the same thing as the `onClick`, so screen readers can still get there.
- Two ways, same outcome.

**Built-in Analytics**

We also got to implement user analytics (when did a user paginate, etc.) into the table. The most basic operations were batteries-included, and we provided a way to extend "table actions" to other actions that may be custom to an implementation.

These small bits of functionality that might get cut when up against a deadline are now provided for free. That's the power of building on a strong, shared platform!

## Rollout Strategy

### Adoption Challenges

One problem design systems teams have is adoption: you build what you think is a great component, but product teams still don't use it, maybe because it doesn't quite meet their needs, or because the effort involved in migrating isn't worth the cost.

### Milestone-Driven Approach

- We aligned our milestones with product team launches
- Milestone 1 (Foundation): Simple table — our team already had a table that we owned for this
- Milestone 2 (Basic features): Admin > Reviews > Templates table
- Milestone 3 (Advanced features): Admin > Compensation > Benchmarking table
- Milestone 4 (Enhancements): Net-new features like row grouping

Each milestone had a specific product team attached, ensuring we were building for real use cases and had immediate feedback loops. Also, we were spreading knowledge to teams as well!

## Outcomes

### Initial Outcomes

- Initial (and medium-term) feedback was positive!
- We migrated a few tables ourselves, which was a great way to kick the tires
- [For tracking component adoption, see my (future) article on tracking.]

### What Could Have Gone Better

- Aligning milestones to product teams was a great idea; I'd definitely do it again.
- However, I think we over-indexed on those milestones. We provided white-glove service in a way that prioritized a single product team over others.
- I think we could / should have moved much faster.

### SimpleTable

- One piece of feedback we got early on was that we needed to provide a simple component that just took in data
- Sometimes backend engineers just want to pass in one argument and have the table. They don't want to make decisions.
- So lean in more to components like SimpleTable
- There's also power in forcing a way to do things vs. nudging product teams to do it a particular way
- Plus, you avoid inconsistency off-the-bat!

## Learnings

### Organizational Insights

- I changed my mind about where design system teams should be located.
- Previously, I thought they needed to be in platform orgs because they were, well, a platform. I thought the failure mode for them being in product orgs would be that they would solve for that specific team instead of a generalized solution.
- But when my team was moved into a product org, I discovered that the close alignment was actually an asset!
- Not only were we closer to our customers and able to react to feedback faster, our LCM (least common manager) was much lower and could force alignment, like tying DS outcomes to product outcomes!
- Ultimately, DS exists to achieve business goals, not build pure components or live in the "right" location.
- Align yourselves with tailwinds by finding the champions in your org, and don't worry too much about org structure.
- Early adopters are crucial: Identify them early, invest in them, and let them become your advocates
- Milestone alignment with product teams: Ensures you're building for real use cases and have immediate feedback loops
