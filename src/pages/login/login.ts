import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {RegisterationPage} from "../registeration/registeration";
import {Socket} from "ng-socket-io";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NativeStorage} from "@ionic-native/native-storage";

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
  constructor(public platform: Platform,public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private socket:Socket,private userService:UserServiceProvider,private nativeStorage:NativeStorage){
    this.authForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  doLogin(logData){
    let user = this.userService.auth(logData.mail,logData.pass);
    if(user){
      this.nativeStorage.setItem('user',user).then(
        data=>{
          console.log('user saved');
          this.socket.connect();
          this.socket.emit('set-user',{name:this.logData.mail,type:1});
          this.navCtrl.setRoot(HomePage);
        }
      )

    }else{
      console.log('wrong login');
    }

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

  forgotPassword() {
    let alert = this.alertCtrl.create({
      title: 'Forgot Your Password',
      cssClass:'prompt_form',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass:'secondary',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          cssClass:'primary',
          handler: data => {
            if (data.email) {
              // logged in!
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

}
