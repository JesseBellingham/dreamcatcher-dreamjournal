import {Page, ModalController, Platform, NavParams, ViewController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/modals/dream-view-full/dream-view-full.html'
})
export class DreamViewFullModal {
    public dream;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        this.dream = this.params.get('dream');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}