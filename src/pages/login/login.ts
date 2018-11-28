import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  regData = { mobile: '', mail: '', pass: '', cnfpass: '' };
  authForm : FormGroup;
  mobile: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  cnfpass: AbstractControl;
  passwordtype:string='password';
  cnfpasswordtype:string='password';
  cnfpasseye:string='eye';
  passeye:string ='eye';
  constructor(public platform: Platform,public fb: FormBuilder, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams){
    this.authForm = this.fb.group({
      'mobile' : [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cnfpass': [null, Validators.compose([Validators.required])]
    });

    this.mobile = this.authForm.controls['mobile'];
    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
    this.cnfpass = this.authForm.controls['cnfpass'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(regData){
    this.navCtrl.push(HomePage);
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
  managecnfPassword() {
    if(this.cnfpasswordtype == 'password'){
      this.cnfpasswordtype='text';
      this.cnfpasseye='eye-off';
    }else{
      this.cnfpasswordtype='password';
      this.cnfpasseye = 'eye';
    }
  }

}
