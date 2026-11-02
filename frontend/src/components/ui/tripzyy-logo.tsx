"use client";

import React from "react";
import { PravasanLogo } from "./pravasan-logo";

interface TripzyyLogoProps {
  className?: string;
  variant?: "full" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "sidebar";
  showText?: boolean;
  inverted?: boolean;
}

export { PravasanLogo };

export const TripzyyLogo: React.FC<TripzyyLogoProps> = (props) => {
  return <PravasanLogo {...props} />;
};
