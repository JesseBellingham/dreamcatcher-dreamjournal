import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DreamService} from '../../services/dream-service';
import {LoggingService} from '../../services/logging-service';

@Component({
    templateUrl: 'build/pages/new-dream/new-dream.html',
    providers: [DreamService]
})
export class NewDreamPage {
    private userId = localStorage.getItem('id_token');
    //private dateNow = new Date().toLocaleDateString;
    public newDream = {
        title: undefined,
        text: undefined,
        rating: 0,
        userId: this.userId,
        dateAdded: undefined
    };

    constructor(public navCtrl: NavController, private dreamService: DreamService, private loggingService: LoggingService) {}

    createNewDream() {
        let date = new Date();
        this.newDream.dateAdded = date.toUTCString();
        this.dreamService.addDream(this.newDream)
         .subscribe(
             data => this.newDream = data,
             error => {
                 this.loggingService.addLogEntry(error);
             }//console.error(err)
         );
    }
}
