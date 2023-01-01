# Pathfinding Visualizer with React-TS

Inspired by Clement's Pathfinding Visualizer, This React app set up with Vite visualizes the Breadth-First-Search algorithm,
a well-known traversal algorithm. 
This tool helps visualize complex algorithms on a grid in order to understand how they work in practice.

This project contains:
- TypeScript
- Functional components and React hooks
- TailwindCSS to stylize the components 

## Visualization (BFS)
![](https://github.com/rt-rocket/pathfinding_visualizer/blob/main/pathfinder/public/pathfinder.gif)

## Results
![](https://github.com/rt-rocket/pathfinding_visualizer/blob/main/pathfinder/public/pathfinder.png)

## Breadth-First-Search

A traversal algorithm used on graph and tree data structures. This algorithm starts at the root and explores each depth/level of the DS
before moving on to the next depth. To do this, we use a queue which adds nodes we've found, but not visited yet. 

## Initial Setup

```bash
npm create vite@latest pathfinder -- --template react-ts
cd pathfinder

# To install dependencies:
npm install
npm run dev

# https://tailwindcss.com/docs/installation
npm install -D tailwindcss
npx tailwindcss init

# Add to tailwind.config.cjs: "./src/components/Pathfinder.tsx" and "./src/components/Cell.tsx"
```

## Running the App
```bash
# To run the development version:
npm run dev

Open http://localhost:5173 to view
```
