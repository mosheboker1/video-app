import VideoRecorder from 'react-video-recorder';
import {MsgDialog} from '../../components/dialog';
import {useEffect, useState} from 'react';
import {Video} from '../../models/video';
import uploads from '../../services/files.service';
import './recording.page.css';
import dayjs from 'dayjs';

export const RecordingPage = () => {
    const [dialogData, setDialogData] = useState(null);
    const [startPos, setStartPos] = useState(null);
    const [startCamera, setStartCamera] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setDialogData({title: 'error', msg: 'You need to enable location'});
        } else {
            if (!localStorage.getItem('allowedCamera') ||
                !localStorage.getItem('allowedLocation'))
                setDialogData({title: 'Permissions', msg: 'Please enable your camera & location.'});
            else
                setStartCamera(true);
        }
    }, []);


    let recordStarted = () => {
        navigator.geolocation.getCurrentPosition((e) => setStartPos({lat: e.coords.latitude, lon: e.coords.longitude}));
    };

    let recordCompleted = (blob) => {
        const video: Video = {
            createTime: dayjs().format('DD/MM/YYYY HH:mm'),
            blob: blob,
            location: startPos
        };
        console.log({video});
        uploads.saveFile(video);
    };

    let activate = () => {
        closeDialog();
        navigator.geolocation.getCurrentPosition(() => {
            localStorage.setItem('allowedLocation', '1');
        });
        let constraints = {audio: true, video: true};
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                localStorage.setItem('allowedCamera', '1');
                setStartCamera(true);
            })
            .catch((err) => {
                if (err.name === 'NotAllowedError') {
                    console.log('User has denied accessed');
                }
            });


    };

    const closeDialog = () => setDialogData(null);
    const showCameraError = (cameraE) => {
        console.log({cameraE});
        setDialogData('Access to camera is block');
    };

    return (
        <div className={'full'}>
            {startCamera && <VideoRecorder
                isOnInitially={startCamera}
                isFlipped={true}
                countdownTime={0}
                onStartRecording={recordStarted}
                onRecordingComplete={recordCompleted}
                onError={showCameraError}
                constraints={{audio: true, video: {facingMode: {ideal: 'environment'}}}}
            />}
            <a className={'gallery-btn'} href="/gallery">Gallery</a>
            {/*<button className={'switch-btn'} onClick={switchCamera}>Switch Camera</button>*/}
            {!!dialogData &&
            <MsgDialog data={dialogData}
                       showModal={!!dialogData}
                       handleOk={activate}
                       handleCancel={closeDialog}
            />
            }
        </div>
    );
};
