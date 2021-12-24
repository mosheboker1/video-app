import uploads from '../../services/files.service';
import React from 'react';
import {Video} from '../../models/video';
import {VideoCard} from '../../components/video-card/video-card';
import './gallery.page.css';
import {FaChevronLeft} from 'react-icons/fa';

export interface GalleryState {
    videos: Video[];
}

export class GalleryPage extends React.Component<{}, GalleryState> {
    constructor(props) {
        super(props);
        this.state = {videos: []};
        this.removeVideo = this.removeVideo.bind(this);
    }

    componentDidMount() {
        uploads.getFiles().then((videos: any) => {
            this.setState({videos});
        });
    }


    removeVideo(idx: number) {
        const videos = this.state.videos.filter((video, index) => idx !== index);
        this.setState({videos});
        uploads.setFiles(videos);
    }


    render() {
        return <div className={'full col'}>
            <h2 className={'ctr m-2'}>Recent Videos</h2>
            <a className={'home-btn'} href="/"><FaChevronLeft/></a>
            <div className={'wrap even'}>
                {this.state.videos?.length ? this.state.videos.map((vid, index) => {
                    return <VideoCard key={index} video={vid} removeVideo={this.removeVideo} idx={index}/>;
                }) : <h5>No Videos yet</h5>}
            </div>
        </div>;
    }
}
