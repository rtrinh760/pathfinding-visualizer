# Pathfinding Visualizer with React-TS

Inspired by Clement's Pathfinding Visualizer, This React app set up with Vite visualizes the various traversal algorithms such as Depth-First-Search, Breadth-First-Search, and A* Search.
This application helps visualize complex algorithms on a grid in order to understand how they work in practice. Use the algorithm dropdown menu before running to select the algorithm.

This project contains:
- TypeScript
- Functional components and React hooks
- TailwindCSS to stylize the components 

## Visualization of A* Search
![](https://github.com/rt-rocket/pathfinding-visualizer/blob/main/public/astar.gif)

## Visualization of BFS
![](https://github.com/rt-rocket/pathfinding-visualizer/blob/main/public/bfs.png)

## Depth-First-Search

A traversal algorithm  used on graph and tree data structures. This algorithm starts at the root and explores a path fully before moving onto the next available path. Typically, a stack data structure is used in combination in order to explore a found path's neighbors first.

## Breadth-First-Search

A traversal algorithm used on graph and tree data structures. This algorithm starts at the root and explores each depth/level of the DS
before moving on to the next depth. To do this, we use a queue which adds nodes we've found, but not visited yet.

## A* Search

A graph traversal / path-searching algorithm that is modified from Djikstra's algorithm to find the shortest path to an endpoint efficiently. It utilizes path costs in order to determine more valuable paths to take towards the destination and keeps track of potential cells with assigned distances with sets.

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
