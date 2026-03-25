import { Directive, ElementRef } from "@angular/core"

@Directive({
    selector: '[autoFocus]',
    standalone: true
})

export class AutoFocusDirective {
    constructor(
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.el.nativeElement.focus()
    }
}