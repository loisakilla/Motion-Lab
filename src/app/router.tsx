import React from "react";
import {createBrowserRouter} from "react-router-dom";
import { RootLayout } from "@/app/layouts/RootLayout";
import { Hero } from "@/features/home/Hero";
import { NotFound } from "@/app/NotFound";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Hero /> },
            { path: "*", element: <NotFound /> }
        ]
    }
]);