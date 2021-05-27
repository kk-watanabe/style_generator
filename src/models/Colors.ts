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
    public readonly rgba: RGBA,
    public readonly hsva: HSVA,
    public readonly hsla: HSLA
  ) {}

  public static convertHexToColors(hex: string): Colors {
    const rgba = convertHexToRgba(hex);
    const hsva = convertRGBAtoHSVA(rgba);
    const hsla = convertHSVAtoHSLA(hsva);

    return new Colors(hex, hsla.h, rgba, hsva, hsla);
  }

  public static convertHSVAToColors(hsva: HSVA): Colors {
    const rgba = convertHSVAtoRGBA(hsva);
    const hex = convertRGBAtoHex(rgba);
    const hsla = convertHSVAtoHSLA(hsva);

    return new Colors(hex, hsla.h, rgba, hsva, hsla);
  }
}
