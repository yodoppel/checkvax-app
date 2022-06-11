import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, UserInfo } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, Observable, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user/User';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  user = null
  
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { } //private auth: AngularFireAuth

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
     sendPasswordResetEmail(this.auth, email).then(() => {
       observer.next();
       observer.complete();
     }).catch(error => {
       observer.error(error);
       observer.complete();
     })
      
      })
    
  }   
   
    //  this.auth.sendPasswordResetEmail(email).then(() => {
    //    observer.next();
    //    observer.complete();
    //  }).catch(error => {
    //    observer.error(error);
    //    observer.complete();
    //  })
    //})
  //}


  // return new Observable<void>(observer => {
  //   setTimeout(() => {
  //     if (email == "error@email.com") {
  //       observer.error({message: "Email not found"});
  //     }
  //     observer.next();
  //     observer.complete();
  //   }, 3000);
  // })

  
  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      
        signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user.uid;
          observer.next({email, id:this.user});
          observer.complete(); 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          observer.error(error);
          observer.complete();
        });
      
    
    })
  }
  // setTimeout(() => {
  //   if (email == "error@gmail.com"){
  //     observer.error({message: 'User not found'});
  //     observer.next();
  //   }else {
  //     const user = new User();
  //     user.email = email;
  //     user.id = "userId";
  //     observer.next(user);
  //   }
  //   observer.complete();
  // }, 3000)

  logout(){
      return from(this.auth.signOut());
  }

  register(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email,password))
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of (user).pipe(
      concatMap(user => {
        if(!user) throw new Error ('Not Authenticated');

        return updateProfile(user, profileData);
      })
    )
  } 




}
