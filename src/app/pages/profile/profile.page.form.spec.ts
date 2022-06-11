import { FormBuilder, FormGroup } from "@angular/forms";
import { ProfilePageForm } from "./profile.page.form";

describe('ProfilePageForm',()=>{
  
    let profilePageForm: ProfilePageForm;
    let profileForm: FormGroup;
    beforeEach(()=>{
        profilePageForm = new ProfilePageForm(new FormBuilder());
        profileForm = profilePageForm.createForm();

    })
    

})