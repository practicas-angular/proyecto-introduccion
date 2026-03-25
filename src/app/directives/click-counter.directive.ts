import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[clickCounter]',
    standalone: true
})

export class ClickCounterDirective {

    private counter: number = 0

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.renderer.setProperty(
            this.el.nativeElement,
            'innerText',
            `You've clicked ${this.counter} times`
        );
    }

    @HostListener('click')
    onClick() {
        this.counter += 1
        this.renderer.setProperty(this.el.nativeElement, 'innerText', `You've clicked ${this.counter} times`)
    }

}


