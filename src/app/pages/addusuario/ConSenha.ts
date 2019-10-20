import { FormControl } from '@angular/forms';

export class ConfSenha {

    static isValid(control: FormControl): any {

    console.log("control value",control.value)   ;
      return null  
    }

}