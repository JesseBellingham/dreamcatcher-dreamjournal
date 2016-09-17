import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Dream } from '../dream';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class DreamService {
    constructor (private http: Http) {}

    //private dreamsUrl = './build/js/text.json';

    getDreams(): Observable<Dream[]> {
        return this.http.get('http://localhost:8080/api/dreams')
        .map(this.extractData)
        .catch(this.handleError);
    }

    addDream(title: string, text: string, rating: number): Observable<Dream> {
        let body = JSON.stringify({ title, text, rating: rating });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8080/api/dream', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message:
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}