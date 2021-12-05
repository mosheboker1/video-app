import {Modal} from 'antd';
import {ElementRef} from 'react';

export interface MsgDialogProps {
    data: {    title: string;    msg: string | ElementRef<any>;}
    showModal: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
}

export const MsgDialog = (props: MsgDialogProps) => {
    return (<Modal title={props.data.title}
            visible={props.showModal}
            onOk={props.handleOk ?? (() => {
                return null;
            })}>
        {typeof props.data.msg === 'string' ? (<p>{props.data.msg}</p>) : props.data.msg}
    </Modal>);
};
