import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, interval, map, merge, Observable, of, publish, refCount, Subject, switchMap, withLatestFrom } from 'rxjs';
import { NumericSphere } from '../models/numeric-sphere-model';

@Injectable()
export class SpheresService {
  private isRedPushing = false;
  private isBluePushing = false;
  private isGreenPushing = false;
  private spheres: NumericSphere[] = [];
  private log: string[] = [];

  //TODO: переделать основной поток на сабжект???
  private readonly log$: Subject<string[]>;
  private readonly redFlow$: Observable<NumericSphere>;
  private readonly blueFlow$: Observable<NumericSphere>;
  private readonly greenFlow$: Observable<NumericSphere>;
  private readonly purpleFlow$: Observable<NumericSphere | void>;
  private readonly rxSpheres$: Observable<NumericSphere[]>;

  constructor() {
    //TODO: актуализировать publish/refcount, потому что deprecated???
    this.log$ = new BehaviorSubject(this.log);
    this.redFlow$ = interval(3000).pipe(
      filter(() => this.isRedPushing),
      switchMap(() => from([this.newSphere('red')])),
      publish(), refCount());
    this.blueFlow$ = interval(1000).pipe(
      filter(() => this.isBluePushing),
      filter(x => Math.floor(Math.random() * 100) > 50),
      switchMap(() => from([this.newSphere('blue')])),
      publish(), refCount());
    this.greenFlow$ = interval(1000).pipe(
      filter(() => this.isGreenPushing),
      filter(x => Math.floor(Math.random() * 100) > 0),
      switchMap(() => from([this.newSphere('green'), this.newSphere('green')])),
      publish(), refCount());

    this.purpleFlow$ = this.blueFlow$.pipe(
      withLatestFrom(this.redFlow$), map(([b, r]) => this.checkPurple(r, b)));

    this.rxSpheres$ = merge(this.purpleFlow$, this.redFlow$, this.blueFlow$, this.greenFlow$).pipe(
      switchMap(() => of(this.spheres)), map(data => this.checkLatest(data)), publish(), refCount());
  }

  getMainFlow(): Observable<NumericSphere[]> {
    return this.rxSpheres$;
  }

  getLog(): Observable<string[]> {
    return this.log$.asObservable();
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

  newSphere(color: string): NumericSphere {
    const numnum = Math.floor(Math.random() * 10 + 1);
    const sphere = { 'color': color, 'numnum': numnum };
    this.spheres.push(sphere);
    return sphere;
  }

  checkPurple(r: NumericSphere, b: NumericSphere): NumericSphere | void {
    console.log(`red: ${r.numnum}, blue: ${b.numnum}`);
    console.log('checking purple');
    if (b.numnum > r.numnum) {
      return this.newSphere('purple');
    }
  }

  checkLatest(spheresList: NumericSphere[]): NumericSphere[] {
    if (spheresList.length > 2) {
      console.log('checking');
      const threeSpheres = spheresList.slice(-3);
      const colors: string[] = [];
      const numnums: number[] = [];
      for (let i of threeSpheres) {
        colors.push(i.color);
        numnums.push(i.numnum);
      }
      const uniqueColors = new Set(colors);
      if (uniqueColors.size === 1) {
        const generatedSphere: NumericSphere = { 'color': 'white', 'numnum': Math.max(...numnums) };
        spheresList.push(generatedSphere);
        console.log('white');
      }
      if (uniqueColors.size === 3) {
        const generatedSphere: NumericSphere = { 'color': threeSpheres[2].color, 'numnum': Math.max(...numnums) };
        spheresList.push(generatedSphere);
        console.log('3 different');
      }
    }
    return spheresList;
  };

  clearAndStop(): void {
    this.isRedPushing = false;
    this.isBluePushing = false;
    this.isGreenPushing = false;
    //TODO: корректный сброс
  }
}