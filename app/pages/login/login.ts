import { Component } from '@angular/core';
import { NavController, Platform, Page } from 'ionic-angular';
import { FbProvider } from '../../providers/fb-provider';
import {HomePage} from '../home/home';

@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [FbProvider]
})
export class LoginPage {
    constructor(public navCtrl: NavController, private fbProvider: FbProvider) {
        // this.platform = platform;
        // this.fb = fbProvider;
        // this.email = '';
        // this.name = '';
        // this.id = '';
    }

    login() {
        this.fbProvider.login().then((success) => {
            if (success) {
                this.navCtrl.push(HomePage);
            }
            // this.fbProvider.getCurrentUserProfile().then(
            //     (profileData) => {
            //         this.email = profileData.email;
            //         this.name = profileData.name;
            //         this.id = profileData.id;
            //     }
            // );
        
    });
}
