import { Injectable } from '@angular/core';
import { BehaviorSubject, bufferCount, filter, from, interval, map, merge, Observable, of, publish, reduce, refCount, repeatWhen, share, Subject, Subscription, switchMap, takeLast, tap, withLatestFrom } from 'rxjs';
import { NumericSphere } from '../models/numeric-sphere-model';

interface ResultSphere {
  sphere: NumericSphere;
  summary: number;
}

@Injectable()
export class SpheresService {
  private isRedPushing = false;
  private isBluePushing = false;
  private isGreenPushing = false;
  private spheres: NumericSphere[] = [];
  private log: string[] = [];

  private readonly log$: Subject<string[]>;
  private readonly redFlow$: Observable<NumericSphere>;
  private readonly blueFlow$: Observable<NumericSphere>;
  private readonly greenFlow$: Observable<NumericSphere>;
  private readonly purpleFlow$: Observable<NumericSphere>;
  private readonly whiteFlow$: Observable<NumericSphere | undefined>;
  private readonly colorFlow$: Observable<NumericSphere>;
  private readonly mainFlow$: Observable<NumericSphere[]>;
  private readonly result$: Observable<any>;
  private readonly refresh$: Subject<void>;

  constructor() {
    this.log$ = new BehaviorSubject(this.log);
    this.redFlow$ = interval(3000).pipe(
      filter(() => this.isRedPushing),
      switchMap(() => from([this.newSphere('red')])),
      share());

    this.blueFlow$ = interval(1000).pipe(
      filter(() => this.isBluePushing),
      filter(x => Math.floor(Math.random() * 100) > 50),
      switchMap(() => from([this.newSphere('blue')])),
      share());

    this.greenFlow$ = interval(1000).pipe(
      filter(() => this.isGreenPushing),
      filter(x => Math.floor(Math.random() * 100) > 75),
      switchMap(() => from([this.newSphere('green'), this.newSphere('green')])),
      share());

    this.purpleFlow$ = this.blueFlow$.pipe(
      withLatestFrom(this.redFlow$), filter(([b, r]) => b.numnum > r.numnum === true), map(([b, r]) => this.checkPurple()), share());

    this.refresh$ = new Subject();

    this.mainFlow$ = of(this.spheres).pipe(repeatWhen(() => this.refresh$), share());

    this.colorFlow$ = merge(this.purpleFlow$, this.redFlow$, this.blueFlow$, this.greenFlow$).pipe(share());

    this.whiteFlow$ = of(this.spheres).pipe(
      repeatWhen(() => this.refresh$),
      switchMap(x => from(x).pipe(takeLast(1))),
      bufferCount(3, 1),
      map(data => this.transformSpheres(data)),
      share()
    );
    this.result$ = this.mainFlow$.pipe(switchMap(data => of(this.countSpheres(data))), share());
  }

  countSpheres(data: NumericSphere[]) {
    const colors = ['red', 'blue', 'green', 'purple', 'white'];
    const arr: ResultSphere[] = [];
    colors.forEach(color => arr.push({
      'sphere':
      {
        'color': color,
        'numnum': data.filter(s => s.color === color).length
      },
      'summary': data.filter(s => s.color === color).reduce((acc, curr) => acc + curr.numnum, 0)
    }));
    arr.sort((l, r) => r.summary - l.summary);
    return arr;
  }

  transformSpheres(data: NumericSphere[]): NumericSphere | undefined {
    const colors: string[] = [];
    const numnums: number[] = [];
    for (let i of data) {
      colors.push(i.color);
      numnums.push(i.numnum);
    }
    const uniqueColors = new Set(colors);
    const max = Math.max(...numnums);
    switch (uniqueColors.size) {
      case 1:
        this.log.push(`White sphere appears with num: ${max}`);
        return this.newSphere('white', max);
      case 3:
        this.log.push(`Three different, new sphere appears with color: ${data[2].color} and num: ${max}`);
        return this.newSphere(data[2].color, max);
      default:
        return undefined;
    }
  }

  getMainFlow(): Observable<NumericSphere[]> {
    return this.mainFlow$;
  }

  getColorFlow(): Observable<NumericSphere> {
    return this.colorFlow$;
  }

  getWhiteFlow(): Observable<NumericSphere | undefined> {
    return this.whiteFlow$;
  }

  getLog(): Observable<string[]> {
    return this.log$.asObservable();
  }

  getResults(): Observable<any | undefined> {
    return this.result$;
  }

  turnRedFlow(): void {
    this.isRedPushing = !this.isRedPushing;
  }

  turnBlueFlow(): void {
    this.isBluePushing = !this.isBluePushing;
  }

  turnGreenFlow(): void {
    this.isGreenPushing = !this.isGreenPushing;
  }

  newSphere(color: string, num?: number): NumericSphere {
    const numnum = Math.floor(Math.random() * 10 + 1);
    const sphere = { 'color': color, 'numnum': num ?? numnum };
    this.spheres.push(sphere);
    this.refresh$.next();
    return sphere;
  }

  checkPurple(): NumericSphere {
    this.log.push('Purple sphere was created');
    return this.newSphere('purple');
  }

  clearAndStop(): void {
    this.isRedPushing = false;
    this.isBluePushing = false;
    this.isGreenPushing = false;
    this.spheres.length = 0;
    this.log.length = 0;
    this.refresh$.next();
  }
}