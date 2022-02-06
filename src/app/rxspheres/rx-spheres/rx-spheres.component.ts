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

  rxSpheres$: Observable<NumericSphere[]>;
  logging$: Observable<string[]>;

  constructor(public service: SpheresService) { }

  ngOnInit(): void {
    this.logging$ = this.service.getLog();
    this.rxSpheres$ = this.service.getMainFlow();
    //TODO: подсчет итоговых значений
  }



}
