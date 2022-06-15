import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CreditCardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.match(/[\d]/g)) {
      return null;
    }
    return {CreditcardInvalid: true};
  };

}
