import {LeafletMap} from '../../components/leaflet-map/leaflet-map';
import videosService from '../../services/video.service';
import {useParams} from 'react-router-dom';
import {Video} from '../../models/video';

export interface VideoPageProps {
    videoId?: string;
}

export const VideoPage = (props: VideoPageProps) => {
        let params = useParams();
        const linkUrl = 'https://s3.amazonaws.com/video.app/241221_114121.webm?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXS3HZ7PBZHEFGIF6%2F20211224%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211224T094126Z&X-Amz-Expires=900&X-Amz-Signature=b77f85360f96381725ea5e23ff6cddbc5bd793f6ff9db67ffb829d009c573ae3&X-Amz-SignedHeaders=host'

        const videoId: string = props.videoId ?? params.videoId;
        let video: Video;
        if (videoId)
            videosService.fetchVideo(videoId);
        return (videoId || linkUrl
                ? (
                    <div className={'col'}>
                        <div className={'flx ctr-cross-axis spc'}>
                            <h3>{'dasasdad'}</h3>
                        </div>

                        <div className={'ctr col content'}>
                            <div className={'vid'}>
                                <video className={'vid'}
                                       src={linkUrl}
                                       loop
                                       controls
                                />
                            </div>
                            {video?.location && <LeafletMap coords={video?.location}/>}
                        </div>
                    </div>
                )
                : (<h2>Video not found. Or you dont have access to that video</h2>)

        );
    }
;
