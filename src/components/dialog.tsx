import {Modal} from 'antd';
import {ElementRef} from 'react';

export interface MsgDialogProps {
    title: string;
    msg: string | ElementRef<any>;
    showModal: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
}

export const MsgDialog = (props: MsgDialogProps) => {
    return (<Modal title="Basic Modal"
            visible={props.showModal}
            onOk={props.handleOk ?? (() => {
                return null;
            })}>
        {typeof props.msg === 'string' ? (<p>props.msg</p>) : props.msg}
    </Modal>);
};
