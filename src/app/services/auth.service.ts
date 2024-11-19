import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fire: AngularFireAuth, private router: Router, private http: HttpClient) { }

  //register
  register(email: string, password: string) {
    console.log('Registering user:', email);
    return this.http.post<{ idToken: string }>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4", { email, password })
      .pipe(catchError((error) => {
        console.error('Firebase registration error:', error);
        return throwError(error);
      }));
  }

  updateEmailStatus(uid: string): Observable<any> {
    const apiUrl = `https://www.ghcbapi.connectbeez.com/collegeregistration/emailstatus/${uid}`;

    // Here you are making a POST request to your backend
    return this.http.post(apiUrl, {});
  }

  //storing token in session storage
  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if the idToken exists in session storage
    if (sessionStorage.getItem('isLogged')) {
      return true;
    }
    return true;
  }


  //login
  login(email: string, password: string): Observable<{ idToken: string, localId: string }> {
    return this.http.post<{ idToken: string, localId: string }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4',
      { email, password }
    ).pipe(
      tap(response => {
        // Store the token and UID in session storage
        sessionStorage.setItem('token', response.idToken);
        sessionStorage.setItem('uid', response.localId); // Store UID
      })
    );
  }


  //get users information
  getUserData(): Observable<{ localId: string, displayName: string, email: string, photoUrl: string, emailVerified: boolean }> {
    const token = sessionStorage.getItem('token');
    console.log(token);
    // Retrieve the idToken from sessionStorage

    // Ensure the token is not null or undefined
    if (!token) {
      throw new Error('No ID token found in session storage. Please log in again.');
    }

    // Make the POST request with the valid idToken
    return this.http.post<{ users: Array<{ localId: string, displayName: string, email: string, photoUrl: string, emailVerified: boolean }> }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4',
      { idToken: token }
    ).pipe(
      map(response => {
        if (response.users && response.users.length > 0) {
          return response.users[0]; // Return the first user's details
        } else {
          throw new Error('No user data returned from Firebase.');
        }
      })
    );
  }


  getUID(): Observable<{ localId: string, emailVerified: boolean }> {
    let token = sessionStorage.getItem('token');

    return this.http.post<{ localId: string, emailVerified: boolean }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4',
      { idToken: token }
    );
  }
  isEmailVerified(): Observable<boolean> {
    const token = sessionStorage.getItem('token'); // Ensure token exists
    return this.http.post<{ users: { emailVerified: boolean }[] }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4',
      { idToken: token }
    ).pipe(
      map(response => {
        // Ensure response contains users and we check the first user
        if (response.users && response.users.length > 0) {
          return response.users[0].emailVerified; // return true/false
        } else {
          return false; // In case no users found, return false
        }
      })
    );
  }

  //verifyemail
  verifyemail(idToken: string) {
    const body = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken
    };
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4',
      body
    );
  }



  async updateEmailVerificationStatus(idToken: string): Promise<void> {
    const response = await this.http.post(`https://your-api-endpoint.com/updateEmailVerification`, {
      idToken: idToken,
      verified: true
    }).toPromise();

    if (!response) {
      throw new Error('Failed to update email verification status');
    }
  }

  //forgotPassword
  forgotPassword(email: string) {
    const body = {
      "requestType": "PASSWORD_RESET",
      "email": email
    }

    return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKHVzMyxwP6kdXyRHxlSkirSWBzu15oG4', body)
  }

}
