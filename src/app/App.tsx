import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { GsapProvider } from '@/app/providers/GsapProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import {StoreProvider} from "@/app/providers/StoreProvider";

export const App: React.FC = () => {
  return (
    <GsapProvider>
        <StoreProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </StoreProvider>
    </GsapProvider>
  );
};
