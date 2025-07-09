---
title: 'Lint Rules, Codemods, and AI'
date: '2025-07-09'
excerpt: "Why I prefer lint rules over codemods and how I'm using AI for migrations."
draft: true
---

Most of the work that frontend platform teams do is migrations. We’re constantly trying to move away from deprecated libraries and towards preferred patterns. It would be impossible for a small team to manually do all this work! This is where automated tools like codemods come in. Codemods let you define a transformation that you can then apply to your code.

Here’s an example. Your team wants to provide a consistent DX for your component library. As part of this work, you’ve identified that the `size` prop should be `sm`, instead of the current single-character `s`. You may have hundreds of usages across the codebase. Maybe other components also use the single-character prop, which means you can’t just find-and-replace this value.

```jsx
// Before
<Button size="s" />

// After
<Button size="sm" />
```

## What Are Codemods and Lint Rules?

Codemods parse your code into an abstract syntax tree, traverse and manipulate it, and output modified code.

The two libraries that I’ve seen used are [jscodeshift](https://github.com/facebook/jscodeshift) and [ts-morph](https://ts-morph.com/), paired with [AST Explorer](https://astexplorer.net/). Here’s an example of what a codemod for the above might look like, for `ts-morph`:

```javascript
project.getSourceFiles().forEach((sourceFile) => {
  sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
    .forEach((jsxElement) => {
      const tagName = jsxElement.getTagNameNode().getText()
      if (tagName === 'Button') {
        const sizeAttr = jsxElement.getAttribute('size')
        if (sizeAttr && sizeAttr.getText() === 'size="s"') {
          jsxElement.replaceWithText(
            jsxElement.getText().replace('size="s"', 'size="sm"'),
          )
        }
      }
    })
})
```

After a codemod runs, you can commit the changed code proceed with your code review process. You don’t have to run the codemod over your entire codebase at once and you can also provide product teams the ability to migrate over at their own pace.

Lint rules are similar. Lint failures can be flagged to your IDE or you can set up a CI step to fail for errors. Also, for the rest of the article, I’m going to be talking about auto-fixable lint rules, in contrast to lint rules that might flag an error but not provide an automated method of fixing the error.

Many people are introduced to lint rules via third-party rulesets, like [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y). It’s also straightforward to write [custom lint rules](https://eslint.org/docs/latest/extend/custom-rules). These are useful for targeting patterns unique to your codebase.

```javascript
create(context) {
  return {
    CallExpression(node) {
      if (node.callee.name === 'deprecatedFunction') {
        context.report({
          node,
          message: 'Use newFunction instead',
            fix: (fixer) => fixer.replaceText(node.callee, 'newFunction'),
          })
        }
      },
    }
  },
```

## Why Lint Rules Beat Codemods

Here’s my hot take: I almost always prefer auto-fixable lint rules over using codemods directly. There are two main reasons for this: built-in progress tracking and regression prevention.

### Progress Tracking

ESLint allows us to set the rule to a `warn` or `error` state. This is handy because we can

### Regression Prevention

Once enabled, the rule prevents new violations from being introduced. Codemods are one-shot; they don't prevent future mistakes, and you need to run them again.

## AI for Writing ESLint Rules

My experience with using tools like Copilot or Cursor for migration work is that they aren’t great yet at making these types of changes, even if you provide detailed instructions. My hunch is that this is a core limitation of how they work: even for a targeted change like the one above, they need to understand and rewrite the entire surrounding context, which just isn’t necessary. Additionally, if you have a large number of call-sites that need to change, you won’t be able to make all the changes you want in the same context window, and you have to figure out a way to parallelize.

However, LLMs have been great at writing lint rules, the same way they excel at writing bash scripts or regex. This way, you get the best of both worlds: development speed from the LLM, but safety since the rule you’ve written is deterministic. LLMs can also write [test cases](https://eslint.org/docs/latest/integrate/nodejs-api#ruletester) for your lint rules.

When writing lint rules for migration, I’d focus on capturing 80-90% of all cases, but not invest too much time fiddling with capturing _all_ cases and achieving perfection. At the end of the day, it’s the codebase that matters, not the tools you used to get it there!

## The Migration Strategy

So, here’s how I might execute on our motivating problem. Each line corresponds to what I might roughly expect a single PR to look like.

1. Add code for allowing both the `sm` and `s` values for the `size` prop for our `Button` component
2. Write (using AI!) an auto-fixable ESLint rule and set to `warn` for the entire codebase
3. Run the autofix across codebase in sections, tagging the code-owning team when applicable, and setting the rule to `error` when the section is completely migrated
4. Use AI to tackle any edge cases if they exist
5. Remove the old `s` prop from `Button` and prevent regressions at a type level

This approach lets you incrementally roll out the change safely. Most of the work isn’t code-related but rather the process overhead of interacting with other teams.
