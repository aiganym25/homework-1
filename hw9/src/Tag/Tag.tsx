import React from "react";
import { TagProps } from "../interfaces/TagProps";

export const Tag = ({ text, selected, onClick }: TagProps) => (
  <div
    className={`tag ${text}-tag ${selected ? `${text}-selected` : ""}`}
    onClick={onClick}
  >
    {text}
  </div>
);
