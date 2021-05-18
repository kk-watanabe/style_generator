export const FormPartsSize = {
  Large: "large",
  Medium: "medium",
  Small: "small",
} as const;

export type FormPartsSize = typeof FormPartsSize[keyof typeof FormPartsSize];
