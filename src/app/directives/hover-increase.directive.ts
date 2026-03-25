import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[hoverIncrease]',
    standalone: true
})
export class HoverIncreaseDirective {

  @HostBinding('style.transform')
  transform: string = 'scale(1)';

  @HostBinding('style.transition')
  transition: string = 'transform 0.2s ease';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.transform = 'scale(1.1)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.transform = 'scale(1)';
  }
}