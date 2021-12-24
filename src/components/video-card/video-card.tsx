import {Video} from '../../models/video';
import './video-card.css';
import {LeafletMap} from '../leaflet-map/leaflet-map';
import {FaTrash} from 'react-icons/fa';

export interface VideoCardProps {
    idx: number;
    video: Video;
    removeVideo: (idx: number) => void;
}

export const VideoCard = (props: VideoCardProps) => {
    return (
        <div className={'card col'}>
            <div className={'flx ctr-cross-axis spc'}>
                <h3>{props.video.createTime}</h3>
                <span className={'trash-icon'} onClick={() => props.removeVideo(props.idx)}><FaTrash/></span>
            </div>

            <div className={'ctr col content'}>
                <div className={'vid'}>
                    <video className={'vid'}
                           src={window.URL.createObjectURL(props.video.blob)}
                           loop
                           controls
                    />
                </div>
                {props.video.location && <LeafletMap coords={props.video.location}/>}
            </div>

        </div>
    );
};
