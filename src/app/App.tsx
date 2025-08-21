import React from "react";
import { router } from "@/app/router";
import { GsapProvider } from "@/app/providers/GsapProvider";
import {RouterProvider} from "react-router-dom";


export const App: React.FC = () => {
    return {
        <GsapProvoder>
            <RouterProvider router={router}
        </GsapProvoder>
    };
};