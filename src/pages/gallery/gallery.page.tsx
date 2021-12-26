import uploads from '../../services/files.service';
import React, {useEffect, useState} from 'react';
import {VideoCard} from '../../components/video-card/video-card';
import './gallery.page.css';
import {FaChevronLeft} from 'react-icons/fa';
import profileService from '../../services/profile.service';
import videoService from '../../services/video.service';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

export const GalleryPage = observer((props: {fbId: string, profile: any }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [videos, setVideos] = useState([]);


    useEffect(() => {
        setShowLoader(true);
        let profile = toJS(props.profile);
        if (!props.fbId && !profile)
            uploads.getFiles().then((videos: any) => {
                setVideos(videos);
                setShowLoader(false);
            });
        else {
            profileService.fetchProfile(profile.firebaseId).then((res: any) => {
                setVideos(res.data.data.videos);
                setShowLoader(false);
            });
        }
    }, [props.profile]);

    function removeVideo(idx: number) {
        const videos = this.state.videos.filter((video, index) => idx !== index);

        uploads.setFiles(videos).then(() => {
            this.setState({showLoader: false});
        });
        let profile = toJS(props.profile);
        if (profile) {
            const video = this.state.videos.filter((video, index) => idx === index)[0];
            if (video.id) {
                videoService.deleteVideo(video.id).then(() => {
                    this.setState({profile, showLoader: false});
                });
            }
        }

        uploads.setFiles(videos).then(() => {
            this.setState({videos, showLoader: false});
        });
    }


    return (<div className={'full col'}>
        <h2 className={'ctr m-2'}>Recent Videos</h2>
        <a className={'home-btn'} href="/"><FaChevronLeft/></a>
        <div className={'wrap even'}>
            {videos?.length ? videos.map((vid, index) => {
                return <VideoCard key={index} video={vid} removeVideo={removeVideo} idx={index}/>;
            }) : <h5>No Videos yet</h5>}
        </div>
    </div>);
});
