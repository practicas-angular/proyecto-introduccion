import { Directive, ElementRef, HostBinding, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[onlyRole]',
    standalone: true
})

export class OnlyRoleDirective {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    @Input() requiredRole!: string;

    @HostBinding('style.display') display: string = '';

    ngOnInit() {
        const userRole = 'normal';

        if (userRole !== this.requiredRole) {
            this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Contenido oculto para NO ADMIN')
        }
    }
}

