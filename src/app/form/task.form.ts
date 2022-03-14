import { AbstractControl, FormControl, ValidationErrors, Validators } from "@angular/forms";


export const TASK_INSERT_FORM = {
    'entitled': new FormControl( null, [Validators.required, Validators.minLength(1), Validators.maxLength(30), notBlank]),
    'description': new FormControl(null, [Validators.minLength(1), Validators.maxLength(100), notBlank]),
    'creationDate': new FormControl(null, [Validators.required]),
    'deadLine': new FormControl(null),
    'endDate': new FormControl(null),
    'priority': new FormControl(null, [Validators.required])
};

//Vérifie que l'entrée n'est pas vide
function notBlank(control : AbstractControl) : ValidationErrors | null {
    if( control.value == null || control.value == "" || control.value && control.value.trim() != "") 
        return null; 
    
    return {
        notBlank: {message : 'Ne peut pas être vide'}     
    }
}

export function startBeforeEnd(control: AbstractControl) : ValidationErrors | null {
    const start = control.value.creationDate; 
    const end = control.value.endDate; 

    if(end == null || start < end){
        return null; 
    }
    return {startBeforeEnd: {
        message: 'la date de fin doit être après la date de création'
        }
    }
}

export function endBeforeDeadLine(control: AbstractControl) : ValidationErrors | null {
    const deadLine = control.value.deadLine; 
    const end = control.value.endDate; 

    if(end == null || deadLine == null || end <= deadLine) {
        return null; 
    }
    return {endBeforeDeadLine: {
        message: 'la date de fin doit être avant la deadLine'
        }
    }
}

export function startBeforeDeadLine(control: AbstractControl) : ValidationErrors | null {
    const deadLine = control.value.deadLine; 
    const start = control.value.creationDate; 

    if(deadLine == null || start < deadLine) {
        return null; 
    }
    return {startBeforeDeadLine: {
        message: 'la deadLine doit être après la date de création'
        }
    }
}
