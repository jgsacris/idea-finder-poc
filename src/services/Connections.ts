import { BehaviorSubject, Observable } from "rxjs";

export interface Point {
    x: number;
    y: number;
}

class ConnectionService {

    private point: BehaviorSubject<Point>;
    constructor() {
        this.point = new BehaviorSubject({ x: 0, y: 0 });
    }

    public set IdeaLocation(point: Point) {
        this.point.next(point);
    }

    public get $IdeaLocation(): Observable<Point> {
        return this.point.asObservable();
    }
}

const connectionService = new ConnectionService();

export {
    connectionService
}