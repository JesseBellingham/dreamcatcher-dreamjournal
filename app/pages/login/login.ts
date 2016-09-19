import { Component } from '@angular/core';
import { NavController, Platform, Page } from 'ionic-angular';
import { FbProvider } from '../../providers/fb-provider';
import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../../services/auth-service';

@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [FbProvider, AuthService]
})
export class LoginPage {
    authToken: number;
    constructor(
        public navCtrl: NavController,
        private fbProvider: FbProvider,
        private authService: AuthService) {

        this.authToken = localStorage.getItem('id_token');
        if (this.authToken){
            this.navCtrl.push(TabsPage);
        }
        authService.userAuthenticated.subscribe(
            authToken => {
                this.authToken = authToken;
                if (this.authToken) {
                    this.navCtrl.push(TabsPage);
                }
        })
        // this.platform = platform;
        // this.fb = fbProvider;
        // this.email = '';
        // this.name = '';
        // this.id = '';
    }

    login() {
        this.authService.login();//.then((success) => {
            // if (success) {
            //     this.navCtrl.push(HomePage);
            // }
            // this.fbProvider.getCurrentUserProfile().then(
            //     (profileData) => {
            //         this.email = profileData.email;
            //         this.name = profileData.name;
            //         this.id = profileData.id;
            //     }
            // );
        
    };
}

