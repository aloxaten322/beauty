// src/masterData.ts
// Example master data used throughout the app.
// This can be replaced with real data or generated from an API.

export interface Item {
  id: number;
  name: string;
  description?: string;
}

export const masterData: Item[] = [
  { id: 1, name: 'Alpha', description: 'First item' },
  { id: 2, name: 'Beta', description: 'Second item' },
  { id: 3, name: 'Gamma', description: 'Third item' },
];
