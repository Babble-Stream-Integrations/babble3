export default function hexToHSL(
  hex: string,
  direction: string,
  percentage: string,
  hue: string,
  strength?: number
) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Could not parse Hex Color");
  }

  const rHex = parseInt(result[1], 16);
  const gHex = parseInt(result[2], 16);
  const bHex = parseInt(result[3], 16);

  const r = rHex / 255;
  const g = gHex / 255;
  const b = bHex / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max === min) {
    // Achromatic
    h = 0;
    s = 0;
  }

  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }
  h /= 6;

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);
  if (isNaN(h)) {
    h = 0;
    s = 0;
  }

  const hsl = "hsl(" + h + "," + s + "%," + l + "%)";
  //make another color by changing the lightness depending on the hue and strength
  const strengthValue = strength ? strength : 20;

  const lChange = l + (hue === "lighter" ? strengthValue : -strengthValue);
  const hslChanged = `hsl(${h},${s}%,${lChange}%)`;

  return `linear-gradient(to ${direction}, ${hsl} , ${percentage}%, ${hslChanged} 100%)`;
}
//code for hsl from https://www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/#hex-to-hsl
