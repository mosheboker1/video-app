import fire from '../assets/config/fire';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import axios from 'axios';

const SERVER_URL = 'http://localhost:7000';

class ProfileService {
    async loginUser(email, pwd) {
        const auth = getAuth(fire);
        return await signInWithEmailAndPassword(auth, email, pwd);
    }

    async registerUser(email, pwd) {
        const auth = getAuth(fire);
        return await createUserWithEmailAndPassword(auth, email, pwd);
    }

    async fetchProfile(firebaseId: string) {
        return await axios.get(`${SERVER_URL}/profiles`, {params: {firebaseId}});
    }

    async createProfile(firebaseId: string, email: string) {
        return await axios.post(`${SERVER_URL}/profiles`, {firebaseId, email});
    }

    //
    // async saveVideo (video: Video, profileId: string)  {
    //     await videoService.uploadVideo(video, profileId)
    //     return await axios.post(`${SERVER_URL}/profiles`, {data: {firebaseId}});
    // }
    // async uploadVideo (video: Video, profileId: string) {
    //     let formData = new FormData();
    //     formData.append('video', video.file);
    //     let response = await axios.post(`${SERVER_URL}/videos/upload`, formData, {
    //         params: {
    //             profileId
    //         }
    //     });
    //     if (!response.data.saved) {
    //         console.error('Try again');
    //     }
    // }
    // async fetchVideo (videoId: string)  {
    //     return await axios.get(`${SERVER_URL}/videos`, {params: {videoId}});
    // }
}

let profileService = new ProfileService();

export default profileService;
