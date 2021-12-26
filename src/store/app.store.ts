import {Profile} from '../models/profile';
import {action, makeObservable, observable, toJS} from 'mobx';

export class AppStore {
    profile: Profile = null;
    videos = [];

    constructor() {
        makeObservable(this, {
            profile: observable,
            videos: observable,
            setProfile: action,
            addVideo: action,
            setVideos: action
        });

    }

    setProfile(profile) {
        this.profile = profile;
    }

    addVideo(video) {
        if (!this.videos)
            this.videos = [video];
        else
            this.videos.push(video);
    }

    getProfile(): Profile {
        return toJS(this.profile);
    }

    setVideos(videos) {
        this.videos = videos;
    }
}

const appStore = new AppStore();

export default appStore;
