import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPcariauth]'
})
export class PcariauthDirective {

  private this_element: ElementRef;
  @Input() mustBeAll: boolean;
  @Input() mustHavePermission: string[];

  constructor(private el: ElementRef) {
    this.this_element = el;
    // el.nativeElement.style.display = 'block';
    // console.log(el.nativeElement.style.display, 'DISPLAY');
    // el.nativeElement.style.display = 'none';
  }// --constructor

  ngOnInit() {

    const permissions = localStorage.getItem('permissions');
    if (permissions) {
      // logged in so return true
      const all_permissions = new Set(JSON.parse(permissions));
      let IS_ALLOWED = false;
      const total_musthave = this.mustHavePermission.length;
      if (total_musthave === 0) {
        IS_ALLOWED = true;
      }
      for (let i = 0; i < total_musthave; ++i) {
        if (!(all_permissions.has(this.mustHavePermission[i]))) {
          if (this.mustBeAll) {
            IS_ALLOWED = false;
            break;
          }
        } else {
          if (!this.mustBeAll) {
            IS_ALLOWED = true;
            break;
          } else {
            if (i === (total_musthave - 1)) {
              IS_ALLOWED = true;
            }
          }
        }
      }

      if (!IS_ALLOWED) {
        this.el.nativeElement.style.display = 'none';
      } else {
      }
    }
  }// --OnInit
}
