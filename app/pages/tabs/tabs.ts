import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NewDreamPage } from '../new-dream/new-dream';
import { MyDreamsPage } from '../my-dreams/my-dreams';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = NewDreamPage;
    this.tab3Root = MyDreamsPage;
  }
}
