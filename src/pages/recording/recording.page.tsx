import VideoRecorder from 'react-video-recorder';
import {MsgDialog} from '../../components/dialog';
import {useState} from 'react';
import {Video} from '../../models/video';
import uploads from '../../services/files.service';
import './recording.page.css';
import dayjs from 'dayjs';

export const RecordingPage = () => {
    const [dialogMsg, setDialogMsg] = useState(null);
    const [startPos, setStartPos] = useState(null);

    if (!navigator.geolocation) {
        // Todo: test it
        setDialogMsg('You need to enable location');
    }

    let recordStarted = () => {
        navigator.geolocation.getCurrentPosition((e) => setStartPos( {lat: e.coords.latitude, lon: e.coords.longitude}));
    };

    let recordCompleted = (blob) => {
        const video: Video = {
            createTime: dayjs().format('DD/MM/YYYY HH:mm'),
            blob: blob,
            location:startPos
        };
        console.log({video});
        uploads.saveFile(video);
    };

    const resetDialog = () => setDialogMsg(null);
    const showCameraError = (cameraE) => {
        console.log({cameraE});
        setDialogMsg('Access to camera is block');
    };

    return (
        <div className={'full'}>
            <VideoRecorder
                isOnInitially
                isFlipped={true}
                countdownTime={0}
                onStartRecording={recordStarted}
                onRecordingComplete={recordCompleted}
                onError={showCameraError}
                constraints={{ audio: true, video: { facingMode: { ideal: "environment" } } }}
            />
            <a className={'gallery-btn'} href="/gallery" >Gallery</a>
            {/*<button className={'switch-btn'} onClick={switchCamera}>Switch Camera</button>*/}
            {dialogMsg &&
            <MsgDialog title={'Error'}
                       msg={dialogMsg}
                       showModal={!!dialogMsg}
                       handleCancel={resetDialog}
                       handleOk={resetDialog}
            />
            }
        </div>
    );
};
