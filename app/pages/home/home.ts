import { Component } from '@angular/core';
import { NavController, Platform, Page } from 'ionic-angular';
//import { FbProvider } from '../../providers/fb-provider';
import {AuthService} from '../../services/auth-service';
import {LoginPage} from '../login/login';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [AuthService]
})
export class HomePage {
    constructor(public navCtrl: NavController, private authService: AuthService) {
        this.authService.userAuthenticated.subscribe(
            authToken => {
                if (!authToken) {
                    this.navCtrl.setRoot(LoginPage);
                    this.navCtrl.popToRoot();
                }
        })
        // this.platform = platform;
        // this.fb = fbProvider;
        // this.email = '';
        // this.name = '';
        // this.id = '';
    }

    logout() {
        this.authService.logout();
    };
}
