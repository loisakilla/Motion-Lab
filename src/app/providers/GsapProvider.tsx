import React, {createContext, useContext} from "react";
import { gsap } from "gsap";

const GsapContext = createContext(gsap);
export const useGsap = () => useContext(GsapContext);

export const GsapProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <GsapContext.Provider value={gsap}>{children}</GsapContext.Provider>;
};