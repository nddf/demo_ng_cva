import { FormGroup } from "@angular/forms";

export function getFormValidationErrors(form: FormGroup) {
  const result: any  = [];
  Object.keys(form.controls).forEach(key => {
    const formProperty = form.get(key);
    if (formProperty instanceof FormGroup) {
      result.push(...getFormValidationErrors(formProperty))
    }
    const controlErrors = formProperty?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          'control': key,
          'error': keyError,
          'value': controlErrors[keyError]
        });
      });
    }
  });

  return result;
}
