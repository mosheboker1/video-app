import {Video} from '../models/video';
import axios from 'axios';
import appStore from '../store/app.store';

const SERVER_URL = 'http://localhost:8000';

class VideosService {
    async saveVideos(video: Video[], profileId: string) {
        /*
                await this.uploadVideo(video, profileId);
                return await axios.post(`${SERVER_URL}/profiles`, {data: {firebaseId}});
        */
    }

    async saveVideo(video: Video, profileId: any) {
        let formData = new FormData();
        formData.append('video', video.file);
        formData.append('profileId', profileId);
        formData.append('location', JSON.stringify(video.location));

        let response = await axios.post(`${SERVER_URL}/videos/upload`, formData);
        appStore.addVideo(response.data.data);
        console.log(response.data.data);
    }

    async fetchVideo(videoId: string) {
        return await axios.get(`${SERVER_URL}/videos/${videoId}`);
    }

    async deleteVideo(videoId: string) {
        return await axios.delete(`${SERVER_URL}/videos`, {params: {videoId}});
    }
}

let videosService = new VideosService();

export default videosService;
