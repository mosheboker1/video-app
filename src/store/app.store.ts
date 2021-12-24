import {Profile} from '../models/profile';
import {makeObservable, observable} from 'mobx';

export class AppStore {
    profile: Profile = null;
    videos = [];

    constructor() {
        makeObservable(this, {
            profile: observable,
            videos: observable
        });

    }

    setProfile(profile) {
        this.profile = profile;
    }

}

const appStore = new AppStore();

export default appStore;
