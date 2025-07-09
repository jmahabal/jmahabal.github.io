/**
 * Enforce using "sm" instead of "s" for Button size prop
 */

import type { TSESLint, TSESTree } from '@typescript-eslint/utils'

const rule: TSESLint.RuleModule<'useSmInsteadOfS'> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using "sm" instead of "s" for Button size prop',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useSmInsteadOfS: 'Use "sm" instead of "s" for Button size prop',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXElement({ openingElement }: TSESTree.JSXElement) {
        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          openingElement.name.name !== 'Button'
        ) {
          return
        }

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
            fix: (fixer) => fixer.replaceText(sizeAttr.value!, '"sm"'),
          })
        }
      },
    }
  },
}

export default rule
