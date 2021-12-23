import VideoRecorder from 'react-video-recorder';
import {MsgDialog} from '../../components/dialog';
import {useEffect, useState} from 'react';
import {Video} from '../../models/video';
import uploads from '../../services/files.service';
import './recording.page.css';
import dayjs from 'dayjs';
import Menu from 'antd/lib/menu';
import {UserOutlined} from '@ant-design/icons';
import {Dropdown} from 'antd';
import videosService from '../../services/video.service';
import AppStore from '../../store/app.store';
import {toJS} from 'mobx';

export const RecordingPage = (props: { store: typeof AppStore }) => {
    const [dialogData, setDialogData] = useState(null);
    const [startPos, setStartPos] = useState(null);
    const [startCamera, setStartCamera] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setDialogData({title: 'error', msg: 'You need to enable location'});
        } else {
            if (!localStorage.getItem('allowedCamera') ||
                !localStorage.getItem('allowedLocation')) {
                setStartCamera(true);
                setDialogData({title: 'Permissions', msg: 'Please enable your camera & location.'});
            } else
                setStartCamera(true);
        }
    }, []);


    let recordStarted = () => {
        navigator.geolocation.getCurrentPosition((e) => setStartPos({lat: e.coords.latitude, lon: e.coords.longitude}));
    };

    let recordCompleted = (blob) => {
        const video: Video = {
            createTime: dayjs().format('DD/MM/YYYY HH:mm'),
            file: new File([blob], dayjs().format('DDMMYY_HHmmss'), {
                lastModified: new Date().getTime(),
                type: blob.type
            }),
            blob: blob,
            location: startPos
        };
        uploads.saveFile(video);
        videosService.saveVideo(video, toJS(props.store.profile).id);
    };

    let activate = () => {
        closeDialog();
        navigator.geolocation.getCurrentPosition(() => {
            localStorage.setItem('allowedLocation', '1');
        });
        let constraints = {audio: true, video: true};
        navigator.mediaDevices?.getUserMedia(constraints)
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
    let menu =
        <Menu>
            <Menu.Item>
                <a href="/login"> Login </a>
            </Menu.Item>
            <Menu.Item>
                <a href="/register"> Register </a>
            </Menu.Item>
        </Menu>;
    return (
        <div className={'full'}>
            <Dropdown trigger={['click']} overlay={menu} className={'menu-btn ant-dropdown-link'}>
                <UserOutlined/>
            </Dropdown>

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
