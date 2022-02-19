import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NumericSphere } from 'src/app/models/numeric-sphere-model';
import { SpheresService } from '../spheres.service';

@Component({
  selector: 'app-rx-spheres',
  templateUrl: './rx-spheres.component.html',
  styleUrls: ['./rx-spheres.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxSpheresComponent implements OnInit {

  mainFlow$: Observable<NumericSphere[]>;
  colorFlow$: Observable<NumericSphere>;
  whiteFLow$: Observable<NumericSphere | undefined>;
  result$: Observable<any | undefined>;
  logging$: Observable<string[]>;

  constructor(public service: SpheresService) { }

  ngOnInit(): void {
    this.logging$ = this.service.getLog();
    this.mainFlow$ = this.service.getMainFlow();
    this.colorFlow$ = this.service.getColorFlow();
    this.whiteFLow$ = this.service.getWhiteFlow();
    this.result$ = this.service.getResults();
  }
}
