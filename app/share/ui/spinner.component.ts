import { Component, Input } from '@angular/core';

@Component({
    selector: 'spinner',
    template: `
        <i *ngIf="visible" class="fa fa-spinner fa-spin" style="font-size:72px"></i>
      `
})
export class SpinnerComponent {
    @Input() visible = true;
} 