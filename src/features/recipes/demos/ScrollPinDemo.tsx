import React from "react";

export const ScrollPinMarkup: React.FC = () => {
  return (
      <div className="h-64 overflow-auto rounded-xl border border-white/10">
          <div className="h-[1200px] relative px-6 py-8">
              <div className="h-40"/>
              <div className="pin sticky top-6 rounded-2xl bg-white/10 border border-white/10 p-6">
                  <h4 className="font-semibold">
                      Pinned Box
                  </h4>
                  <p className="text-sm text-white/70">
                      Scroll inside to see pin & fade
                  </p>
              </div>
          </div>
      </div>
  );
};