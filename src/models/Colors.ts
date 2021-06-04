import type { RGBA, HSVA, HSLA } from "$util/color-util";
import {
  convertHexToRgba,
  convertRGBAtoHSVA,
  convertHSVAtoHSLA,
  convertHSVAtoRGBA,
  convertRGBAtoHex,
} from "$util/color-util";

/**
 * Color 情報
 */
export class Colors {
  constructor(
    public readonly hex: string,
    public readonly hue: number,
    public readonly alpha: number,
    public readonly rgba: RGBA,
    public readonly hsva: HSVA,
    public readonly hsla: HSLA
  ) {}

  get rgbaStyle(): string {
    const { r, g, b, a } = this.rgba;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  get isAlpha(): boolean {
    return this.alpha !== 1;
  }

  public static updateHue(hsva: HSVA, hue: number): Colors {
    const updateHsva = { h: hue, s: hsva.s, v: hsva.v, a: hsva.a };
    const rgba = convertHSVAtoRGBA(updateHsva);
    const hex = convertRGBAtoHex(rgba);
    const hsla = convertHSVAtoHSLA(hsva);

    return new Colors(hex, hue, rgba.a, rgba, updateHsva, hsla);
  }

  public static updateAlpha(hex: string, alpha: number): Colors {
    const rgba = convertHexToRgba(hex, alpha);
    const hsva = convertRGBAtoHSVA(rgba);
    const hsla = convertHSVAtoHSLA(hsva);

    return new Colors(hex, hsla.h, rgba.a, rgba, hsva, hsla);
  }

  public static convertRgbaToColors(rgba: RGBA): Colors {
    const hsva = convertRGBAtoHSVA(rgba);
    const hsla = convertHSVAtoHSLA(hsva);
    const hex = convertRGBAtoHex(rgba);

    return new Colors(hex, hsla.h, rgba.a, rgba, hsva, hsla);
  }

  public static convertHexToColors(hex: string): Colors {
    const rgba = convertHexToRgba(hex);
    const hsva = convertRGBAtoHSVA(rgba);
    const hsla = convertHSVAtoHSLA(hsva);

    return new Colors(hex, hsla.h, rgba.a, rgba, hsva, hsla);
  }

  public static convertHSVAToColors(hsva: HSVA): Colors {
    const rgba = convertHSVAtoRGBA(hsva);
    const hex = convertRGBAtoHex(rgba);
    const hsla = convertHSVAtoHSLA(hsva);

    return new Colors(hex, hsla.h, rgba.a, rgba, hsva, hsla);
  }
}
