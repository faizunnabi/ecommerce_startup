import {Component, Input} from '@angular/core';

/**
 * Generated class for the CommonHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'common-header',
  templateUrl: 'common-header.html'
})
export class CommonHeaderComponent {

  @Input() title: string;
  @Input() type:string;
  constructor() {

  }

}
