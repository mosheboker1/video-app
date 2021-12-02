import uploads from '../../services/files.service';
import React from 'react';
import {Video} from '../../models/video';
import {VideoCard} from '../../components/video-card/video-card';
import {LeftOutlined} from '@ant-design/icons';
import './gallery.page.css';

export interface GalleryState {
    videos: Video[];
}

export class GalleryPage extends React.Component<{}, GalleryState> {
    constructor(props) {
        super(props);
        this.state = {videos: []};
    }

    componentDidMount() {
        uploads.getFiles().then((videos: any) => {
            this.setState({videos});
        });
    }


    render() {
        return <div className={'full col'}>
            <h1 className={'ctr'}>Recent Videos</h1>
            <a className={'home-btn'} href="/"><LeftOutlined/></a>
            <div className={'wrap even'}>
                {this.state.videos?.length ? this.state.videos.map((vid, index) => {
                    return <VideoCard key={index} video={vid}/>;
                }) : <h5>No Videos yet</h5>}
            </div>
        </div>;
    }
}
