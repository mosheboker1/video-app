import {Video} from '../../models/video';
import './video-card.css';
import {LeafletMap} from '../leaflet-map/leaflet-map';

export interface VideoCardProps {
    video: Video;
}

export const VideoCard = (props: VideoCardProps) => {
    debugger;
    return (
        <div className={'card col'}>
            <div className={'flx ctr'}>
                <h3>{props.video.createTime}</h3>
            </div>

            <div className={'ctr col content'}>
                <div className={'vid'}>
                    <video className={'vid'}
                           src={window.URL.createObjectURL(props.video.blob)}
                           loop
                           controls
                    />
                </div>
                    <LeafletMap coords={props.video.location}/>
            </div>

        </div>
    );
};
