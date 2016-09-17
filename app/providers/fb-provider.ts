import {Page, Platform, NavController} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {CordovaOauth, Facebook} from "ng2-cordova-oauth/core";

@Injectable()
export class FbProvider {
    public oAuth: CordovaOauth;
    private provider: Facebook;

    constructor(public navCtrl: NavController, private platform: Platform) {
        this.oAuth = new CordovaOauth();
        this.provider = new Facebook({
            clientId: "296960413998400",
            appScope: ["email"]
        });
    }

    login() {
        return this.platform.ready().then(() => {
            return this.oAuth.logInVia(this.provider).then((success) => {
                //alert(JSON.stringify(success));
                return success;
            }, (error) => {
                console.log(JSON.stringify(error));
            });
        });
        //var facebookConnectPlugin: any;
        // var p = new Promise((resolve, reject) => {
        // if (this.platform.is('cordova')) {
        //     this.facebook.login(['email'], (success) => {
        //             console.log(JSON.stringify(success));
        //             resolve(success);
        //         },(err) => {
        //             console.log(JSON.stringify(err));
        //             reject(err);
        //         });
            
        //     } else {
        //         console.log("Please run me on a device");
        //         reject('Please run me on a device');
        //     }
        // });
        // return p;
    }
   
    getCurrentUserProfile() {
        //var facebookConnectPlugin: any;
        // var p = new Promise((resolve, reject) => {
        //     this.facebook.api('me?fields=email,name', null,
        //     (profileData) => {
        //         console.log(JSON.stringify(profileData));
        //         resolve(profileData);
        //     },(err) => {
        //         console.log(JSON.stringify(err));
        //         reject(err);
        //     });
        // });
        // return p;
    }
}
