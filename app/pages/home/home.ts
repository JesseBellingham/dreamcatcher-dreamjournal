import {Component} from '@angular/core';
import {NavController, Platform, Page} from 'ionic-angular';
import {AuthService} from '../../services/auth-service';
import {LoginPage} from '../login/login';
import {CommentService} from '../../services/comment-service';
import {LoggingService} from '../../services/logging-service';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [AuthService]
})
export class HomePage {
    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private commentService: CommentService,
        private loggingService: LoggingService
    ) {
        this.authService.userAuthenticated.subscribe(
            authToken => {
                if (!authToken) {
                    this.navCtrl.setRoot(LoginPage);
                    this.navCtrl.popToRoot();
                }
        })
    }
    private userId = localStorage.getItem('id_token');
    private newComment = {
        title: undefined,
        text: undefined,
        rating: 0,
        userId: this.userId,
        dateAdded: undefined
    };

    addComment() {
        let date = new Date();
        this.newComment.dateAdded = date.toUTCString();
        this.commentService.addComment(this.newComment)
         .subscribe(
             data => this.newComment = data,
             error => {//console.error(err)
                 this.loggingService.addLogEntry(error);
             }
         );
    }

    logout() {
        this.authService.logout();
    };
}
