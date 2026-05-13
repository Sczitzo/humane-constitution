/// <reference types="vite/client" />

// Vite ?worker imports
declare module '*?worker' {
  const WorkerConstructor: new () => Worker
  export default WorkerConstructor
}
