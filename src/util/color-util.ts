export type HSV = { h: number; s: number; v: number };
export type HSVA = HSV & { a: number };
export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { a: number };
export type HSL = { h: number; s: number; l: number };
export type HSLA = HSL & { a: number };
export type Hex = string;
export type Hexa = string;

/**
 * Hex を RGBA に変換する.
 */
export function convertHexToRgba(hex: Hex, alpha: number = 1): RGBA {
  // ロングバージョンの場合（例：#FF0000）
  let colorType = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  let result: number[] = null;

  if (colorType) {
    result = colorType.slice(1, 4).map(function (x) {
      return parseInt(x, 16);
    });
  }

  // ショートバージョンの場合（例：#F00）
  colorType = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (colorType) {
    result = colorType.slice(1, 4).map(function (x) {
      return 0x11 * parseInt(x, 16);
    });
  }

  if (result === null) {
    return {
      r: 255,
      g: 255,
      b: 255,
      a: alpha,
    } as RGBA;
  }

  console.log(result);
  return {
    r: result[0],
    g: result[1],
    b: result[2],
    a: alpha,
  } as RGBA;
}

/**
 * RGBA を HSVA に変換する.
 */
export function convertRGBAtoHSVA(rgba: RGBA): HSVA {
  if (!rgba) return { h: 0, s: 1, v: 1, a: 1 };

  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;

  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }
  }

  if (h < 0) h = h + 360;

  const s = max === 0 ? 0 : (max - min) / max;
  const hsv = [h, s, max];

  return { h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a };
}

/**
 * HSVA を HSLA に変換する.
 */
export function convertHSVAtoHSLA(hsva: HSVA): HSLA {
  const { h, s, v, a } = hsva;

  const l = v - (v * s) / 2;

  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);

  return { h, s: sprime, l, a };
}

/**
 * HSVA を RGBA に変換する.
 */
export function convertHSVAtoRGBA(hsva: HSVA): RGBA {
  const { h, s, v, a } = hsva;
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };

  const rgb = [f(5), f(3), f(1)].map((v) => Math.round(v * 255));

  return { r: rgb[0], g: rgb[1], b: rgb[2], a };
}

/**
 * number を 16進数 の string に変換する.
 */
function convertNumbertoHex(value: number): string {
  const h = Math.round(value).toString(16);

  return ("00".substr(0, 2 - h.length) + h).toUpperCase();
}

/**
 * RGBA を Hex に変換する.
 */
export function convertRGBAtoHex(rgba: RGBA): Hex {
  return `#${[
    convertNumbertoHex(rgba.r),
    convertNumbertoHex(rgba.g),
    convertNumbertoHex(rgba.b),
  ].join("")}`;
}

export function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}
