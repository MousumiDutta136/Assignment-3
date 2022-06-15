import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  @Input() formCtrl! : FormControl| any;
  @Input() maxLength = 4;
  @Input() maxLengthCred = 16;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input') onInput() {
    if(this.formCtrl) {
      const value = this.formCtrl.value;

      const finalValue = value.substring(0,this.maxLength);
      this.formCtrl.setValue(finalValue);
    }
  }


}
