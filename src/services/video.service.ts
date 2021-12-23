import {Video} from '../models/video';
import axios from 'axios';

const SERVER_URL = 'http://localhost:7000';

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
        let response = await axios.post(`${SERVER_URL}/videos/upload`, formData, {
            params: {
                profileId
            }
        });
        if (!response.data.saved) {
            console.error('Try again');
        }
    }

    async fetchVideo(videoId: string) {
        return await axios.get(`${SERVER_URL}/videos`, {params: {videoId}});
    }

    async deleteVideo(videoId: string) {
        return await axios.delete(`${SERVER_URL}/videos`, {params: {videoId}});
    }
}

let videosService = new VideosService();

export default videosService;
