import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DreamService } from '../../services/dream-service';
import {Dream} from '../../dream';

@Component({
  templateUrl: 'build/pages/my-dreams/my-dreams.html',
  providers: [DreamService]
})

export class MyDreamsPage {
    authToken: number;
    public dreams = new Array<Dream>();
    public errorMessage = "";

    constructor(public navCtrl: NavController, private dreamService: DreamService) {
        this.authToken = localStorage.getItem('id_token');
        this.getMyDreams(this.authToken);
    }

    getMyDreams(authToken) {
        this.dreamService.getDreams(authToken)
        .subscribe(
            dreams => this.dreams = dreams,
            error => console.error(error)//this.errorMessage = <any>error
        );
        console.log(this.dreams);
    }
}
