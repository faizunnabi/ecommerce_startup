import {Component, Input} from '@angular/core';

/**
 * Generated class for the OfferTagComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'offer-tag',
  template: `<span>{{offer}}% Off</span>`,
  styles:[
    'span {\n' +
    '        font-weight: normal;\n' +
    '        font-size: 12px;\n' +
    '        position: absolute;\n' +
    '        right:5px;\n' +
    '        top:1px;\n' +
    '        background: #6cbd45;\n' +
    '        color:#fff;\n' +
    '        padding:3px;\n' +
    '    }',
  ]
})
export class OfferTagComponent {

  offer:any;
  @Input() discount: any;

  constructor() {

  }

  ngOnInit() {
    this.offer = this.discount;
  }

}
