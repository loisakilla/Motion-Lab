import React from 'react';
import { Button } from '@/components/button';
import { NavLink } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 className="text-5xl font-extrabold tracking-tight">Ooopsie</h1>
    <p className="mt-3 text-white/70">Page not found</p>
    <div className="mt-6">
      <Button asChild>
        <NavLink to="/">Relocate to home</NavLink>
      </Button>
    </div>
  </div>
);
