import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { GsapProvider } from "@/app/providers/GsapProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";


export const App: React.FC = () => {
    return (
        <GsapProvider>
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </GsapProvider>
    );
};