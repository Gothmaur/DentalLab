import { Directive, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnChanges {

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cambiarFontSize();
  }

  cambiarFontSize(){
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-size',
      '20px'
    );this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'color',
      'red'
    );

  }
}
