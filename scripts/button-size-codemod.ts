// Codemod: Update <Button size="s" /> to <Button size="sm" /> using ts-morph
import { Project, SyntaxKind } from 'ts-morph'

const project = new Project()
project.addSourceFilesAtPaths('src/**/*.{ts,tsx}')

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

project.saveSync()
console.log('Codemod complete!')
