import { Component } from '@angular/core';
import { NavController, Platform, Page } from 'ionic-angular';
import { FbProvider } from '../../providers/fb-provider';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [FbProvider]
})
export class HomePage {
    constructor(public navCtrl: NavController, private fbProvider: FbProvider) {
        // this.platform = platform;
        // this.fb = fbProvider;
        // this.email = '';
        // this.name = '';
        // this.id = '';
    }

    login() {
        this.fbProvider.login();//.then(() => {
            // this.fbProvider.getCurrentUserProfile().then(
            //     (profileData) => {
            //         this.email = profileData.email;
            //         this.name = profileData.name;
            //         this.id = profileData.id;
            //     }
            // );
        
    };
}
