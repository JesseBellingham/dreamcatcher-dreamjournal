import {Component} from '@angular/core';
import {NavController, Platform, Page} from 'ionic-angular';
import {FbProvider} from '../../providers/fb-provider';
import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../../services/auth-service';

@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [FbProvider, AuthService]
})
export class LoginPage {
    authToken: number;
    constructor(public navCtrl: NavController, private authService: AuthService) {

        this.authToken = localStorage.getItem('id_token');
        if (this.authToken) {
            this.navCtrl.push(TabsPage);
        }
        authService.userAuthenticated.subscribe(
            authToken => {
                this.authToken = authToken;
                if (this.authToken) {
                    this.navCtrl.push(TabsPage);
                }
        })
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

