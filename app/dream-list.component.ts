import { Component, OnInit } from '@angular/core';
import { Dream } from './dream';
import { DreamService } from './dream-service';

@Component({
  // selector: 'hero-list',
  // templateUrl: 'app/toh/hero-list.component.html',
  providers: [ DreamService ]
})

export class DreamListComponent implements OnInit {
    errorMessage: string;
    dreams: Dream[];
    mode = 'Observable';

    constructor (private dreamService: DreamService) {}

    ngOnInit() { this.getDreams(); }

    getDreams() {
        this.dreamService.getDreams()
        .subscribe(
            dreams => this.dreams = dreams,
            error => this.errorMessage = <any>error
        );
    }

    addDream(name: string, text: string) {
        if (!text) { return; }
        this.dreamService.addDream(name, text)
        .subscribe(
            dream => this.dreams.push(dream),
            error => this.errorMessage = <any>error
        );
    }
}