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
    `span { 
            display: block;
            width:60px;
            height: 20px;
            font-weight: normal;
            font-size: 12px;
            position: absolute;
            right:0px;
            top:110px;
            background: #6cbd45;
            color:#fff;
            line-height: 20px;
        }
    span:before{
      content:'';
      position: absolute;
      width:40%;
      height:100%;
      top:0px;
      right:0px;
      background-image: linear-gradient(to right,transparent, black);
      opacity: 0.2;
    }
    
    `
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
