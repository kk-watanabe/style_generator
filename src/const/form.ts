export const FormPartsSize = {
  Large: "large",
  Medium: "medium",
  Small: "small",
} as const;

export type FormPartsSize = typeof FormPartsSize[keyof typeof FormPartsSize];

export interface SelectOption {
  label: string;
  value: string | number;
  disabled: boolean;
}

export interface SliderOption {
  min: number;
  max: number;
  step: number;
}
