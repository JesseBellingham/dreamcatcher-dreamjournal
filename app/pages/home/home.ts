import {Component} from '@angular/core';
import {ModalController, NavController, Platform, Page} from 'ionic-angular';
import {AuthService} from '../../services/auth-service';
import {LoginPage} from '../login/login';
import {DreamViewFullModal} from '../modals/dream-view-full/dream-view-full';
import {CommentService} from '../../services/comment-service';
import {LoggingService} from '../../services/logging-service';
import {DreamService} from '../../services/dream-service';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [AuthService, CommentService, LoggingService, DreamService]
})
export class HomePage {
    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        private authService: AuthService,
        private commentService: CommentService,
        private loggingService: LoggingService,
        private dreamService: DreamService
    ) {
        this.authService.userAuthenticated.subscribe(
            authToken => {
                if (!authToken) {
                    this.navCtrl.setRoot(LoginPage);
                    this.navCtrl.popToRoot();
                }
        })

        this.getDreamFeed(this.userId)
    }    
    private userId = localStorage.getItem('id_token');
    private newComment = {
        text: undefined,
        rating: 0,
        userId: this.userId,
        dateCreated: undefined,
        lastModified: undefined
    };
    private dreams = [];

    addComment() {
        let date = new Date();
        this.newComment.dateCreated = date.toUTCString();
        this.commentService.addComment(this.newComment)
         .subscribe(
             data => this.newComment = data,
             error => {//console.error(err)
                 this.loggingService.addLogEntry(error);
             }
         );
    }
    getDreamFeed(userId) {
        this.dreamService.getDreamFeed(userId)
        .subscribe(
            dreams => this.dreams = dreams,
            error => {//console.error(error)//this.errorMessage = <any>error
                this.loggingService.addLogEntry(error);
            }
        );
        console.log(this.dreams);
    }

    readFull(dream) {
        let modal = this.modalCtrl.create(DreamViewFullModal, {dream});
        modal.present();
    }

    logout() {
        this.authService.logout();
    };
}
