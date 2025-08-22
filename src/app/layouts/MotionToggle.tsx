import React, { useEffect, useState } from "react";
import {Button} from "@/components/button";
import { setReducedMotion, shouldReduceMotion, initReducedMotionFromStorage } from "@/shared/lib/motion";

export const MotionToggle: React.FC = () => {
    const [on, setOn] = useState(false);
    useEffect(() => { initReducedMotionFromStorage(); setOn(shouldReduceMotion());}, []);
    return (
        <Button variant="ghost" size="sm" onClick={() => {setReducedMotion(!on); setOn(!on); }} title="Переключить">
            {on ? "Motion: Off" : "Motion: On"}
        </Button>
    );
};