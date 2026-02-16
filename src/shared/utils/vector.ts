export class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(vec: Vector3): Vector3 {
        return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    public sub(vec: Vector3): Vector3 {
        return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    public mul(vec: Vector3): Vector3 {
        return new Vector3(this.x * vec.x, this.y * vec.y, this.z * vec.z);
    }

    public div(vec: Vector3): Vector3 {
        return new Vector3(this.x / vec.x, this.y / vec.y, this.z / vec.z);
    }
}
