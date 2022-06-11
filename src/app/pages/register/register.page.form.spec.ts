import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form";


describe('RegisterPageForm', () => {
  
    let registerPageForm: RegisterPageForm;
    let form: FormGroup;

    beforeEach(() => {

        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();

    })

    it('should empty email be invalid',() =>{
        expect(form.get('email').valid).toBeFalsy();
    })

    it('should empty password be invalid',() =>{
        expect(form.get('password').valid).toBeFalsy();
    })
    
    it('should empty name be invalid',() =>{
        expect(form.get('name').valid).toBeFalsy();
    })
    
    it('should empty department be invalid',() =>{
        expect(form.get('department').valid).toBeFalsy();
       })

    it('should empty ic be invalid',() =>{
        expect(form.get('ic').valid).toBeFalsy();
       })

    it('should empty phoneNum be invalid',() =>{
        expect(form.get('phoneNum').valid).toBeFalsy();
    })

     it('should empty staffid be invalid',() =>{
        expect(form.get('staffid').valid).toBeFalsy();
    })





    it('should invalid email be invalid', () =>{
        form.get('email').setValue('invalidEmail');

        expect(form.get('email').valid).toBeFalsy();
    })
    
    it('should have password less than 6 characters be invalid',() =>{
        form.get('password').setValue('1234');
        
        expect(form.get('password').valid).toBeFalsy();
       })

    it('should password password different from confirmpass be invalid',() =>{
        form.get('password').setValue('anyPassword');
        form.get('confirmpass').setValue('anotherPassword');
        
        expect(form.get('confirmpass').valid).toBeFalsy();
       })


    it('should staffid must be less than 8 characters be invalid',() =>{
        form.get('staffid').setValue('CC200');
        
        expect(form.get('staffid').valid).toBeFalsy();
    })



    it('should form be valid',() => {
        form.get('email').setValue('any@gmail.com');
        form.get('password').setValue('anyPassword');
        form.get('confirmpass').setValue('anyPassword');
        form.get('name').setValue('anyName');
        form.get('department').setValue('anyDepartment');
        form.get('ic').setValue('anyIC');
        form.get('phoneNum').setValue('anyPhoneNum');
        form.get('staffid').setValue('anyStaffid');

        expect(form.valid).toBeTruthy();
    })
    


})