import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LogEntry } from '../log-entry';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class LoggingService {
    constructor (private http: Http) {}

    addLogEntry(entry: any): Observable<LogEntry> {
        let body = JSON.stringify({
            userId: entry.userId,
            title: entry.title || "",
            text: entry.text || "",
            rating: entry.rating,
            dateAdded: entry.dateAdded
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8080/api/errors', body, options)
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