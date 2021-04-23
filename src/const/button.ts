export const ButtonSize = {
  Large: "large",
  Medium: "medium",
  Small: "small",
} as const;

export type ButtonSize = typeof ButtonSize[keyof typeof ButtonSize];

export const ButtonColor = {
  Light: "light",
  Dark: "dark",
  SiteColor: "site-color",
} as const;

export type ButtonColor = typeof ButtonColor[keyof typeof ButtonColor];
