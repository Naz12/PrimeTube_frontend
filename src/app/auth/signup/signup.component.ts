import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from "../auth.service";

import "../../shared/appConfig.json"
import { CurrentUser } from 'src/app/model/user/currentUser.model';
import { Store } from '@ngrx/store';

import { State } from "../../reducers/index";
import { Login } from '../auth.actions';
import * as jwtDecode from 'jwt-decode'
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup
  url: string = 'http://localhost:3000/auth/signup'
  user: CurrentUser


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private store: Store<State>, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required]
      } , {validators : this.checkPassword})
    })
  }



  onRegister() {
    this.user = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      favorites: ['Music', 'FootBall'],
      password: this.registerForm.get('passwordGroup.password').value,
      profileImagePath: 'placeholder image path'
    }


    this.authService.signUp('POST', this.url, this.user).pipe(
      tap(response => {
        const token = response['token'] as string;
        const decodeToken = jwtDecode(token);

        this.store.dispatch(new Login({ user: decodeToken, token: token }));
        this.router.navigateByUrl('/auth/signin')
      })
    ).subscribe();
  }


  checkPassword(abstractController: AbstractControl): { [key: string]: boolean } | null {
    const password = abstractController.get('password');
    const confirmPassword = abstractController.get('confirmPassword')

    if (password.pristine || confirmPassword.pristine) {
      return null;
    }

    if (password === confirmPassword) {
      return null;
    }
    else {
      return { 'notmatch': true }
    }
  }

}
