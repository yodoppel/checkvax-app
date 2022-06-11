import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ProfilePageForm {

    private formBuilder : FormBuilder;

    constructor(formBuilder: FormBuilder){

        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup{
        return this.formBuilder.group({
            department: [''],
            phoneNum: [''], //Validators.pattern("^((\\ 60-?)|0)?[0-9]{10}$")
        });

        
    }
}