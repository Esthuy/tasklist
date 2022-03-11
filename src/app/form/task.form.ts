import { FormControl, Validators } from "@angular/forms";


export const TASK_INSERT_FORM = {
    'entitled': new FormControl( null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    'description': new FormControl(null, [Validators.minLength(1), Validators.maxLength(100)]),
    'creationDate': new FormControl(null, [Validators.required]),
    'deadLine': new FormControl(null),
    'endDate': new FormControl(null),
    'priority': new FormControl(null, [Validators.required])
};