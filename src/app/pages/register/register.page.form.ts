import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm {

    private formBuilder : FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){

        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm(): FormGroup{
        let form = this.formBuilder.group({
            email:['',[Validators.required, Validators.email]],// Validators.minLength(7), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
            password:['',[Validators.required,Validators.minLength(6)]],
            confirmpass:[''],
            name: ['', [Validators.required]],
            department: ['',[Validators.required]],
            ic: ['',[Validators.required]], //Validators.pattern('^[0-9]*$')
            phoneNum: ['', [Validators.required]], //Validators.pattern("^((\\ 60-?)|0)?[0-9]{10}$")
            staffid:['',[Validators.required, Validators.minLength(7)] ]
        });

        form.get('confirmpass').setValidators(matchPasswordAndConfirmPass(form));

        return form;
        
    }

    getForm() : FormGroup {
        return this.form;
    }
}

function matchPasswordAndConfirmPass(form : FormGroup) : ValidatorFn {
    const password = form.get('password');
    const confirmpass = form.get('confirmpass');

    const validator = () => {
        return password.value == confirmpass.value ? null: {isntMatching: true}
    };

    return validator;
}