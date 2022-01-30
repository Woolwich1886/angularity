import { Component, Input, OnInit } from '@angular/core';
import { NumericSphere } from 'src/app/models/numeric-sphere-model';

@Component({
  selector: 'app-numeric-sphere',
  templateUrl: './numeric-sphere.component.html',
  styleUrls: ['./numeric-sphere.component.css']
})
export class NumericSphereComponent implements OnInit {

  @Input()
  sphereData: NumericSphere

  color: Record<string, string>

  constructor() { }

  ngOnInit(): void {
    this.color = {'background-color': this.sphereData.color}
  }
}


