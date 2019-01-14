import {Component, ElementRef, Input, Renderer2} from '@angular/core';

/**
 * Generated class for the ShrinkingHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shrinking-header',
  templateUrl: 'shrinking-header.html'
})
export class ShrinkingHeaderComponent {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  @Input('offset') offset: number;

  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer2) {

  }

  ngAfterViewInit(){

    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    this.renderer.setStyle(this.element.nativeElement, 'z-index', '2');

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev){

    ev.domWrite(() => {

      this.newHeaderHeight = this.headerHeight - ev.scrollTop;

      if(this.newHeaderHeight < this.offset){
        this.newHeaderHeight = this.offset;
      }

      this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
      this.renderer.setStyle(this.element.nativeElement, 'z-index', '-1');

    });

  }

}
