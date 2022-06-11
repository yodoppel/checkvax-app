import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {

    private formBuilder : FormBuilder;

    constructor(formBuilder: FormBuilder){

        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup{
        return this.formBuilder.group({
            email:['',[Validators.required, Validators.email]],// Validators.minLength(7), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
            password:['',[Validators.required]]
        });

        
    }
}