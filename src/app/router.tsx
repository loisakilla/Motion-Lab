import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { Hero } from '@/features/home/Hero';
import { NotFound } from '@/app/NotFound';
import { RecipesPage } from '@/features/recipes/pages/RecipesPage';
import { PlaygroundPage } from '@/features/playground/PlaygroundPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Hero /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
