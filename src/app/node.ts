export abstract class Node {

   private _walkable: boolean;
   _x: number;
   _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  public abstract isWalkable(): boolean;

  get walkable(): boolean {
    return this._walkable;
  }

  set walkable(value: boolean) {
    this._walkable = value;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}
