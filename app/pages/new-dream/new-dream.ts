import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { DreamListComponent } from '../../dream-list.component';
import { DreamService } from '../../services/dream-service';

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

    constructor(public navCtrl: NavController, private dreamService: DreamService) {}

    createNewDream() {
        let date = new Date();
        this.newDream.dateAdded = date.toUTCString();
        this.dreamService.addDream(this.newDream)
         .subscribe(
             data => this.newDream = data,
             err => console.error(err)
         );

        //var dream = this.newDream;
        //this.dreamArray.push(this.newDream);
    }
    //dreamListComponent.getDreams()
}
