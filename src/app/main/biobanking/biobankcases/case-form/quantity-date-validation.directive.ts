import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

function quantityValidation() {
  return (control:AbstractControl) => {
    if (control && control instanceof FormGroup) {
      let group = control as FormGroup;
      let isNotNull = group.controls['datecollected'] && group.controls['datecollected'].value != null;

      let qtycollected = group.controls['qtycollected'];
      if (qtycollected) {
        qtycollected.setErrors({'minimumRequired': true});
      }

      if (qtycollected != null) {
        if (qtycollected.value ==  null) {
          qtycollected.setErrors({'required': true});
        } else {
          if (qtycollected) {
            qtycollected.setErrors(null);
          }
        }
      }
      if (isNotNull) {
        let isMinimum = qtycollected && qtycollected.value != null && qtycollected.value > 0;
        if (!isMinimum && qtycollected) {
          qtycollected.setErrors({'minimumRequired': true});
        } else {
          if (qtycollected) {
            qtycollected.setErrors(null);
          }
        }
        // else {
        //   if (qtycollected && qtycollected.value == null) {
        //     qtycollected.setErrors({'required': true});
        //   } else {
        //     qtycollected.setErrors(null);
        //   }
        // }
      } else {
        // if (qtycollected != null) {
        //   qtycollected.setErrors(null);
        // }
      }
      
      // let qtycollected = group.controls['qtycollected'];
      // if (isValid != null) {
      //   let minimum = qtycollected && qtycollected.value && qtycollected.value > 0;
      //   console.log(qtycollected, 'le cool');
      //   console.log(minimum, 'micool');
      //   if (!minimum && qtycollected) {
      //     qtycollected.setErrors({"minimumRequired": true});
      //   }
      // }


      // if (!isValid) {
      //   isValid = group.controls['qtycollected'] && group.controls['qtycollected'].value && group.controls['qtycollected'].value > 0;
      //   console.log(isValid, 'greater valid');
      // }
      // if (isValid) {
      //   // console.log(group.controls['qtycollected'], 'micool');
      //   // if (group.controls['qtycollected'] && group.controls['qtycollected'].value == null) {
      //   //   group.controls['qtycollected'].setErrors({'required': true});
      //   // }
      //   return null;
      // } else {
      //   console.log(group.controls['qtycollected'], 'micool');
      //   group.controls['qtycollected'].setErrors({'minimumError': true});
      //   return {'minimumRequired': 'failed'};
      // }
    }
    return null;
  };
}

@Directive({
  selector: '[appQuantityDateValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: QuantityDateValidationDirective, multi: true }]
})
export class QuantityDateValidationDirective implements Validator {
  private valFn;

  constructor() {
    this.valFn = quantityValidation();
  }

  validate(c:AbstractControl) {
    return this.valFn(c);
  }

}
