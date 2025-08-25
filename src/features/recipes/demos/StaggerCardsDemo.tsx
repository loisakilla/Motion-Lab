import React from "react";

export const StaggerCardsMarkup: React.FC = () => {
  return (
      <div  className="grid grid-cols-3 gap-3 p-3">
          {Array.from({ length: 9 }).map((_, i) =>  (
              <div key={i} className="r-card h-16 rounded-xl bg-white/10 border border-white/10"/>
          ))}
      </div>
  );
};