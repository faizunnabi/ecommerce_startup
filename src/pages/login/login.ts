import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {RegisterationPage} from "../registeration/registeration";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  logData = { mail: '', pass: '' };
  authForm : FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  passwordtype:string='password';

  passeye:string ='eye';
  constructor(public platform: Platform,public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
    this.authForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  doLogin(logData){
    this.navCtrl.push(HomePage);
  }

  moveToRegister()
  {
    this.navCtrl.push(RegisterationPage);
  }

  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }

}
