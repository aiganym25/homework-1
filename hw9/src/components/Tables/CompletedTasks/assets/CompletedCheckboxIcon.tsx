import React from "react";
interface Props {
    onClick: () => void;
  }
export default function CompletedCheckboxIcon({ onClick }: Props) {
  return (
    <div className="checkded-checkbox" onClick={onClick}>
      <svg
        width="21"
        height="22"
        viewBox="0 0 21 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.5" width="21" height="21" rx="4" fill="#D3D3D3" />
        <path
          d="M5 11.505L8.40476 14.8417L15.725 6.5"
          stroke="white"
          strokeWidth="2.38333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
