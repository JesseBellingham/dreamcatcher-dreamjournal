import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DreamService} from '../../services/dream-service';
import {LoggingService} from '../../services/logging-service';

@Component({
    templateUrl: 'build/pages/new-dream/new-dream.html',
    providers: [DreamService, LoggingService]
})
export class NewDreamPage {
    private userId = 'gfhjtrfghrdghdhfdgty76u7y65htr';//localStorage.getItem('id_token');
    public newDream = {
        title: undefined,
        text: undefined,
        rating: 0,
        userId: this.userId,
        dateCreated: undefined,
        lastModified: undefined
    };

    constructor(public navCtrl: NavController, private dreamService: DreamService, private loggingService: LoggingService) {}

    createNewDream() {
        let date = new Date();
        this.newDream.dateCreated = date;
        this.dreamService.addDream(this.newDream)
             .subscribe(
                 data => this.newDream = data,
                 error => {
                     this.loggingService.addLogEntry(error);
                 }//console.error(err)
             );
    }
}
