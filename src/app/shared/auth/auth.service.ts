import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface UserData {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}}`;
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  currentUser = new BehaviorSubject<User>(null);
  userToken: string = "";
  private tokenExpTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signupUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const { email, localId, idToken, expiresIn } = res;

          this.handleAuth(email, localId, idToken, Number(expiresIn));
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.loginUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const { email, localId, idToken, expiresIn } = res;

          this.handleAuth(email, localId, idToken, Number(expiresIn));
        })
      );
  }

  automaticSignIn() {
    const userData: UserData = JSON.parse(localStorage.getItem(environment.userDataLocalStorageKey));

    if(!userData) return;
    const {email, id, _token, _tokenExpirationDate} = userData;

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if(loadedUser.token) {
      this.currentUser.next(loadedUser);

      const expDuration =
      new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.automaticSignOut(expDuration);
    }
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {

    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    const formUser = new User(email, userId, token, expDate);
    this.currentUser.next(formUser);
    this.automaticSignOut(expiresIn * 1000);

    localStorage.setItem(environment.userDataLocalStorageKey, JSON.stringify(formUser));


  }

  signOut() {
    this.currentUser.next(null);
    localStorage.removeItem(environment.userDataLocalStorageKey);
    if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
    this.router.navigate(['auth']);
  }

  automaticSignOut(expDuration: number) {
    console.log("Expiration Duration:", expDuration);

    this.tokenExpTimer = setTimeout(this.signOut
    , expDuration);
  }


}
