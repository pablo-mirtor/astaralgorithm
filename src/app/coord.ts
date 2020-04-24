export class Coord {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  getX(): number {
    return this._x;
  }

  setXx(value: number) {
    this._x = value;
  }

  getY(): number {
    return this._y;
  }

  setY(value: number) {
    this._y = value;
  }

  calculateDistance(dest: Coord): number{
    let dist: number= Math.hypot(dest.getX()-this.getX(), dest.getY()-this.getY());
    return dist;
  }
}
