type RGB = {
  r: number;
  g: number;
  b: number;
};

type RgbArray = [number, number, number];

type HexColor = string;

type Color = RGB | RgbArray | HexColor;

interface BlackWhite {
  black: HexColor;
  white: HexColor;
  threshold?: number;
}

const DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;
const RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;
const DEFAULT_BW: BlackWhite = {
  black: "#000000",
  white: "#ffffff",
  threshold: DEFAULT_THRESHOLD,
};

function padz(str: string, len = 2): string {
  return (new Array(len).join("0") + str).slice(-len);
}

function hexToRgbArray(hex: string): RgbArray {
  if (hex.slice(0, 1) === "#") hex = hex.slice(1);
  if (!RE_HEX.test(hex)) throw new Error(`Invalid HEX color: "${hex}"`);
  // normalize / convert 3-chars hex to 6-chars.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return [
    parseInt(hex.slice(0, 2), 16), // r
    parseInt(hex.slice(2, 4), 16), // g
    parseInt(hex.slice(4, 6), 16), // b
  ];
}

function toRGB(c: RgbArray): RGB {
  return { r: c[0], g: c[1], b: c[2] };
}

function toRgbArray(c: Color): RgbArray {
  if (!c) throw new Error("Invalid color value");
  if (Array.isArray(c)) return c as RgbArray;
  return typeof c === "string" ? hexToRgbArray(c) : [c.r, c.g, c.b];
}

// http://stackoverflow.com/a/3943023/112731
function getLuminance(c: RgbArray): number {
  let i, x;
  const a = []; // so we don't mutate
  for (i = 0; i < c.length; i++) {
    x = c[i] / 255;
    a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function invertToBW(
  color: RgbArray,
  bw: BlackWhite | boolean,
  asArr?: boolean
): RgbArray | HexColor {
  const options = bw === true ? DEFAULT_BW : Object.assign({}, DEFAULT_BW, bw);
  const threshold = options.threshold as number;
  return getLuminance(color) > threshold
    ? asArr
      ? hexToRgbArray(options.black)
      : options.black
    : asArr
    ? hexToRgbArray(options.white)
    : options.white;
}

// -------------------------------
// PUBLIC MEMBERS
// -------------------------------

/**
 *  Generates inverted (opposite) version of the given color.
 *  @param {Color} color - Color to be inverted.
 *  @param {BlackWhite|boolean} [bw=false] - Whether to amplify the inversion to
 *  black or white. Provide an object to customize black/white colors.
 *  @returns {HexColor} - Hexadecimal representation of the inverted color.
 */
function invertColor(color: Color, bw: BlackWhite | boolean = false): HexColor {
  color = toRgbArray(color);
  if (bw) return invertToBW(color, bw) as HexColor;
  return "#" + color.map((c) => padz((255 - c).toString(16))).join("");
}

/**
 *  Utility methods to generate inverted version of a color.
 *  @namespace
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace invertColor {
  /**
   *  Generates inverted (opposite) version of the given color, as a RGB object.
   *  @alias invertColor.asRgbObject
   *  @param {Color} color - Color to be inverted.
   *  @param {BlackWhite|boolean} [bw] - Whether to amplify the inversion to
   *  black or white. Provide an object to customize black/white colors.
   *  @returns {RGB} - RGB object representation of the inverted color.
   */
  export function asRGB(color: Color, bw?: BlackWhite | boolean): RGB {
    color = toRgbArray(color);
    const list: RgbArray = bw
      ? (invertToBW(color, bw, true) as RgbArray)
      : (color.map((c) => 255 - c) as RgbArray);
    return toRGB(list);
  }

  /**
   *  Generates inverted (opposite) version of the given color, as a RGB array.
   *  @param {Color} color - Color to be inverted.
   *  @param {BlackWhite|boolean} [bw] - Whether to amplify the inversion to
   *  black or white. Provide an object to customize black/white colors.
   *  @returns {RGB} - RGB array representation of the inverted color.
   */
  export function asRgbArray(
    color: Color,
    bw?: BlackWhite | boolean
  ): RgbArray {
    color = toRgbArray(color);
    return bw
      ? (invertToBW(color, bw, true) as RgbArray)
      : (color.map((c) => 255 - c) as RgbArray);
  }

  /**
   *  Default luminance threshold used for amplifying inversion to black and
   *  white.
   *  @type {number}
   */
  export const defaultThreshold = DEFAULT_THRESHOLD;
  export const asRgbObject = asRGB;
}
export default invertColor;
