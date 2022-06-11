import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/model/user/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;
  let authService: AuthService;

 

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login",loginReducer),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
    authService = TestBed.get(AuthService);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it ('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })


  it ('should recover email/password on forgot password', () =>{
    spyOn(authService, 'recoverEmailPassword').and.returnValue(new Observable(() => {}));

    fixture.detectChanges(); //start pages
    component.form.get('email').setValue("abc@gmail.com");//user set valid email 
    page.querySelector("#recoverPasswordButton").click(); //user clicked on forgot password button
    store.select('login').subscribe(loginState => {       //expect loginState.isRecoveringPassword is true
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState =>{   //verify loadingState.show == true
      expect(loadingState.show).toBeTruthy();
    })
  })
   
 

  it ('should hide loading and show success message when has recovered password', () =>{
  spyOn(toastController, 'create'); //to spy on toast controller 'create'
  
  fixture.detectChanges(); //start page
  store.dispatch(recoverPassword()); //set login state as recovering password
  store.dispatch(recoverPasswordSuccess()); //set login state as recovered password
  store.select('loading').subscribe(loadingState =>{  //verify loadingState.show == false
    expect(loadingState.show).toBeFalsy();
  })
  
  expect(toastController.create).toHaveBeenCalledTimes(1); //verify message was shown
  })



  it ('should hide loading and show error message when error on recover password', () =>{
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges(); //start page
    store.dispatch(recoverPassword());  //recover password
    store.dispatch(recoverPasswordFail({error: "message"})); //recover password fail
    store.select('loading').subscribe(loadingState =>{  //expect loading not showing
      expect(loadingState.show).toBeFalsy();
  
    });  
    expect(toastController.create).toHaveBeenCalledTimes(1); //expect error shown   
  })

  it ('should show loading and start login when logging in', () => {
    spyOn(authService, 'login').and.returnValue(new Observable(()=> {}));

    fixture.detectChanges();//start page
    component.form.get('email').setValue('abc@gmail.com');//set valid staff id
    component.form.get('password').setValue('anyPassword');//set any valid password
    page.querySelector('#loginButton').click();//click on login button 
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();//expect loading is showing up
    }) 
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();//expect user is logging in 
    })

  })

  it ('should hide loading and send user to home page when user has logged in', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));
    
    fixture.detectChanges();//start page
    component.form.get('email').setValue('abc@gmail.com');// set valid staff id
    component.form.get('password').setValue('anyPassword');// set valid password
    page.querySelector('#loginButton').click();// click on login button
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();// expect loading hidden
    }) 
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy(); // expect logged in 
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);// expect home page showing 

  })

  it('should hide loading and show error when user couldnt login', () => {
    spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();//start page
    component.form.get('email').setValue('error@gmail.com');// set error staff id
    component.form.get('password').setValue('anyPassword');// set any password
    page.querySelector('#loginButton').click();// click on login button
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();// expect loading hidden
    }) 
    expect(toastController.create).toHaveBeenCalledTimes(1); // expect error message shown 

  })



});
