// auth.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private poolData = {
    UserPoolId: 'us-east-1_3vFVOOhyr',
    ClientId: '2d7ql7ngfkm7i63oe3ipkhjof7',
  };

  private eventoSubject = new Subject<string>();
  private eventoLogin = new Subject<boolean>();

  private userPool = new CognitoUserPool(this.poolData);

  constructor() {}

  signUp(username: string, password: string): Promise<any> {
    const attributeList: any[] = [];
    const dataEmail = {
      Name: 'email',
      Value: username,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  signIn(username: string, password: string): Promise<any> {
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          resolve(session);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          resolve('ok');
      }
      });
    });
  }

  enviarEvento(mensaje: string) {
    this.eventoSubject.next(mensaje);
  }

  enviarEventoLogin(showLogin: boolean) {
    this.eventoLogin.next(false);
  }

  obtenerEventoObservable() {
    return this.eventoSubject.asObservable();
  }

  obtenerEventoLoginObservable() {
    return this.eventoLogin.asObservable();
  }
}
