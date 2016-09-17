import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { DreamListComponent } from '../../dream-list.component';
import { DreamService } from '../../services/dream-service';

@Component({
    templateUrl: 'build/pages/new-dream/new-dream.html',
    providers: [DreamService]
})
export class NewDreamPage {
    public dreamArray = [];
    public userId = 1;
    public newDream = {
        title: "",
        text: "",
        rating: 0,
        userId: this.userId
    };

    constructor(public navCtrl: NavController, private dreamService: DreamService) {}

    createNewDream() {
        this.dreamService.addDream(this.newDream.title, this.newDream.text, this.newDream.rating)
         .subscribe(
             data => this.newDream = data,
             err => console.error(err)
         );

        //var dream = this.newDream;
        this.dreamArray.push(this.newDream);
    }
    //dreamListComponent.getDreams()
}
