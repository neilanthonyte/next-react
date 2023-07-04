export class Coordinate {
  breathingMagnitude: number;
  key: string;
  constructor(
    public x: number,
    public y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    const rX = x - width / 2;
    const rY = y - height / 2;
    // distance from the center
    const dist = Math.sqrt(rX * rX + rY * rY);
    // less impact away from the center
    const r = Math.max(0, 1 - dist / radius);
    // ease in/out curve
    this.breathingMagnitude = 3 * r * r - 2 * r * r * r;
    this.key = `${x}-${y}`;
  }
}
