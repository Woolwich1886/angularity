import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, interval, merge, Observable, of, Subject } from 'rxjs';
import { filter, map, publish, refCount, switchMap } from 'rxjs/operators';
import { NumericSphere } from 'src/app/models/numeric-sphere-model';

@Component({
  selector: 'app-rx-spheres',
  templateUrl: './rx-spheres.component.html',
  styleUrls: ['./rx-spheres.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxSpheresComponent implements OnInit {

  testSphere: NumericSphere;
  spheres: NumericSphere[];
  rxSpheres$: Observable<NumericSphere[]>;
  isRedPushing = false;
  isBluePushing = false;
  isGreenPushing = false;
  logging: string[];
  rxReds$: Observable<NumericSphere>;
  rxBlues$: Observable<NumericSphere>;
  rxGreens$: Observable<NumericSphere>;

  constructor() { }

  ngOnInit(): void {
    this.spheres = [];
    this.logging = [];
    this.rxReds$ = interval(3000).pipe(
      filter(() => this.isRedPushing),
      switchMap(() => from([this.newSphere('red')])),
      publish(), refCount()
    );
    this.rxBlues$ = interval(1000).pipe(
      filter(() => this.isBluePushing),
      filter(x => Math.floor(Math.random() * 100) > 0),
      switchMap(() => from([this.newSphere('blue')])),
      publish(), refCount()
    );
    this.rxGreens$ = interval(1000).pipe(
      filter(() => this.isGreenPushing),
      filter(x => Math.floor(Math.random() * 100) > 0),
      switchMap(() => from([this.newSphere('green'), this.newSphere('green')]))
    );
    this.rxSpheres$ = merge(this.rxReds$, this.rxBlues$, this.rxGreens$).pipe(
      switchMap(() => of(this.spheres)),
      map(x => this.checkLatest(x)),
    );
  }

  newSphere(color: string): NumericSphere {
    const numnum = Math.floor(Math.random() * 10 + 1);
    const sphere = { 'color': color, 'numnum': numnum };
    this.spheres.push(sphere);
    return sphere;
  }

  checkLatest(listOfSpheres: NumericSphere[]): NumericSphere[] {
    if (listOfSpheres.length >= 3) {
      const lastThreeSpheres = listOfSpheres.slice(-3);
      const colors: string[] = [];
      const numnums: number[] = [];
      for (let i of lastThreeSpheres) {
        colors.push(i.color);
        numnums.push(i.numnum);
      }
      const uniqueColors = new Set(colors);
      if (uniqueColors.size === 1) {
        const generatedSphere: NumericSphere = { 'color': 'white', 'numnum': Math.max(...numnums) };
        this.logging.push(`3 spheres have the same color: ${colors[0]}. And now transform into white one!`);
        console.log('same color!');
        listOfSpheres.splice(-3);
        listOfSpheres.push(generatedSphere);
      }
      if (uniqueColors.size === 3) {
        const generatedSphere: NumericSphere = { 'color': lastThreeSpheres[2].color, 'numnum': Math.max(...numnums) };
        this.logging.push(`3 differen spheres in a row transform into ${generatedSphere.color}, ${generatedSphere.numnum}`);
        console.log('3 different!');
        listOfSpheres.splice(-3);
        listOfSpheres.push(generatedSphere);
      }
    }
    return listOfSpheres;
  }

  clearAndStop(): void {
    this.isRedPushing = false;
    this.isBluePushing = false;
    this.isGreenPushing = false;
    this.spheres = [];
    this.rxSpheres$ = merge(this.rxReds$, this.rxBlues$, this.rxGreens$).pipe(switchMap(() => of(this.spheres)), map(x => this.checkLatest(x)));
    this.logging = [];
  }
}
