---
title: 'Lint Rules, Codemods, and AI'
date: '2025-07-24'
excerpt: 'Why I prefer lint rules over codemods and how I’m using AI for migrations.'
draft: false
---

Most of the work that frontend platform teams do is migrations. We’re constantly moving away from deprecated libraries and towards preferred patterns. It’d be impossible for a small team to manually do all this work! This is where automation comes in.

Here’s a simple scenario: your team wants to provide a consistent DX for your component library. As part of this work, you’ve identified that the `size` prop should be `sm`, instead of the current single-character `s`. You may have hundreds of usages across the codebase. Maybe other components also use the single-character prop, which means you can’t just find-and-replace this value.

```jsx
// Existing code
<Button size="s" />

// Desired code
<Button size="sm" />
```

For this type of migration, I prefer auto-fixable lint rules over codemods. Let me explain why!

## How Codemods and Lint Rules Work

Codemods parse your code into an abstract syntax tree, traverse and manipulate it, and output modified code.

The two libraries that I’ve seen used are [jscodeshift](https://github.com/facebook/jscodeshift) and [ts-morph](https://ts-morph.com/), paired with [AST Explorer](https://astexplorer.net/). Here’s an example of what a codemod for the above might look like, for `ts-morph`:

```javascript
// loop through each file,
project.getSourceFiles().forEach((sourceFile) => {
  sourceFile
    // finding all elements,
    .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
    .forEach((jsxElement) => {
      const tagName = jsxElement.getTagNameNode().getText()

      // where the element name is "Button",
      if (tagName === 'Button') {
        const sizeAttr = jsxElement.getAttribute('size')

        // and the "size" attribute has a value of "s",
        if (sizeAttr && sizeAttr.getText() === 'size="s"') {
          jsxElement.replaceWithText(
            // and replace that value with "sm" instead.
            jsxElement.getText().replace('size="s"', 'size="sm"'),
          )
        }
      }
    })
})
```

After a codemod runs, you commit the changed code and proceed with your code review process. It’s usually a good idea to also run other formatters like Prettier before committing, or before chaining multiple codemods. You also don’t have to run the codemod over your entire codebase at once, which means product teams have the ability to migrate over at their own pace.

Lint rules are really similar. Many people are introduced to lint rules via third-party rulesets, like [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y). It’s also straightforward to write [custom lint rules](https://eslint.org/docs/latest/extend/custom-rules). Custom rules are really useful for targeting patterns unique to your codebase!

The main difference between codemods and lint rules is that lint rules can highlight errors without necessarily needing to fix them. These lint failures are flagged to your IDE or you can set up a CI check to fail on any errors. For the rest of this article, I’m going to be talking about auto-fixable lint rules, in contrast to lint rules that might flag an error but not provide an automated method of fixing the error.

```javascript
create(context) {
  return {
    // for each element,
    JSXElement({ openingElement }: TSESTree.JSXElement) {
      // where the element name is "Button",
      if (
        openingElement.name.type !== 'JSXIdentifier' ||
        openingElement.name.name !== 'Button'
      ) {
        return
      }

      // and the "size" attribute has a value of "s",
      const sizeAttr = openingElement.attributes.find(
        (attr): attr is TSESTree.JSXAttribute =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === 'size' &&
          attr.value?.type === 'Literal' &&
          attr.value.value === 's',
      )

      if (sizeAttr) {
        context.report({
          node: sizeAttr,
          messageId: 'useSmInsteadOfS',
          // replace that value with "sm" instead.
          fix: (fixer) => fixer.replaceText(sizeAttr.value!, '"sm"'),
        })
      }
    },
  }
},
```

## Why Lint Rules Beat Codemods

Here’s my hot take: I almost always prefer auto-fixable lint rules over using codemods directly. There are two main reasons for this: built-in progress tracking and regression prevention.

**Tracking Progress**

ESLint allows us to more easily report on the status of a migration. By setting the rule to `warn`, we can identify how many more locations we have left to fix and ownership for those parts of the codebase. This lets us better plan out an incremental strategy that might involve other product teams.

**Preventing Regressions**

Once enabled, the rule prevents new violations from being introduced. Codemods are one-shot; they don’t prevent future mistakes, and you may need to run them multiple times.

**Caveats**

As with everything, there’s nuance here. One case when it may be helpful to use a codemod is when you want to migrate between two valid values (example: change all current `font-size: small` values to `font-size: medium`). You might want to one-shot these with a codemod, because you do want to allow for `small` font-sizes... just not for the old, existing code though. That said, you can still write an ESLint rule and run the auto-fix, and then not enable the rule.

## AI’s Sweet Spot: ESLint Rules

My experience with using tools like Copilot or Cursor for migration work is that they aren’t great yet at making these types of changes, even if you provide detailed instructions. My hunch is that this is a core limitation of how they work: LLMs need to understand and rewrite the entire surrounding context, which is usually unnecessary.

Additionally, if you have a large number of call-sites that need to change, you won’t be able to make all the changes you want in the same context window and you have to figure out a way to parallelize anyway.

However, LLMs have been great at writing lint rules, the same way they excel at writing bash scripts or regex. This way, you get the best of both worlds: development speed from the LLM and safety from the deterministic rule. LLMs can also write [test cases](https://eslint.org/docs/latest/integrate/nodejs-api#ruletester) for your lint rules.

When writing lint rules for migration, I’d focus on capturing 80-90% of all cases, but not invest too much time fiddling with capturing _all_ cases and achieving perfection. At the end of the day, it’s the codebase that matters not the tools you used to get it there!

## Migration Strategy

So, here’s how I might execute on our motivating problem. Each step roughly corresponds to what I'd expect a single PR to look like.

1. Add code for allowing both the `sm` and `s` values for the `size` prop for our `Button` component
2. Use AI to write an auto-fixable ESLint rule and set to `warn` for the entire codebase
3. Run the autofix across codebase in sections, tagging the code-owning team when applicable, and setting the rule to `error` when the section is completely migrated
4. Use AI to tackle any remaining edge cases
5. Remove the old `s` prop from `Button` and prevent regressions at a Typescript level

This approach lets you roll out the change safely. Most of the work isn’t code-related but rather the process overhead of interacting with other teams.

## Summary

- Prefer lint rules over codemods for migrations since they’re better for tracking progress and preventing regressions
- Lean on AI to help write deterministic lint rules rather than directly transform code
- The hardest part of migrations is bringing other teams along, not the technical changes themselves
