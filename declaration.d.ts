declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.json' {
  const content: unknown
  export default content
}

/// <reference types="vite/client" />
