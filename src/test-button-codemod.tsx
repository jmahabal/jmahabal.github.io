// Test file to demonstrate the Button size codemod
export function TestButtons() {
  return (
    <div>
      {/* These will be transformed by the lint rule */}
      <Button size="s" />
      <Button size="s" disabled />
      <Button size="s" onClick={() => {}} />

      {/* These should remain unchanged */}
      <Button size="sm" />
      <Button size="md" />
      <Button size="lg" />

      {/* Other components should not be affected */}
      <OtherComponent size="s" />
      <Button otherProp="s" />
    </div>
  )
}

// Mock components for testing
function Button({ size, ...props }: { size?: string; [key: string]: unknown }) {
  return <button {...props} data-size={size} />
}

function OtherComponent({ size }: { size?: string }) {
  return <div data-size={size} />
}
