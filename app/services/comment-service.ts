import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Comment} from '../comment';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class CommentService {
    constructor (private http: Http) {}
    
    getComments(authToken): Observable<Comment[]> {
        return this.http.get('http://localhost:8080/api/comments/' + authToken)
        .map(this.extractData)
        .catch(this.handleError);
    }

    addComment(newComment: any): Observable<Comment> {
        let body = JSON.stringify({
                userId: newComment.userId,
                title: newComment.title || "",
                text: newComment.text || "",
                rating: newComment.rating,
                dateAdded: newComment.dateAdded
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8080/api/comments', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message:
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}