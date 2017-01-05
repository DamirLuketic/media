import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[appdropdown]'
})
export class DropdownDirective {

  constructor() { }

  public isOpen: boolean = false;

  @HostListener('mouseenter') openMenu(){
    this.isOpen = true;
  }

  @HostListener('mouseleave') closeMenu(){
    this.isOpen = false;
  }

  @HostBinding('class.open') get setStatus(){
    return this.isOpen;
  }

}
