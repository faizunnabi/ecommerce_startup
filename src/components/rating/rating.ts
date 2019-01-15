import {Component, Input} from '@angular/core';

/**
 * Generated class for the RatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rating',
  template: `
    <ion-icon *ngFor="let n of [1,2,3,4,5]" name='star' [color]="n <= rate_count ? 'accent':'semilight'"></ion-icon>
    ({{rate_count}})
  `,
  styles:[]
})
export class RatingComponent {

  rate_count:number;
  @Input()
  rate_counter:number;

  constructor() {

  }

  ngOnInit() {
    this.rate_count = this.rate_counter;
  }

}
