import { useState } from 'react';
import { Modal } from 'antd';
import UserPersonalInfo from '@components/manageAccount/UserPersonalInfo.jsx';

export default function ModalPersonalInfo(props) {
    const [open, setOpen] = useState(() => props.user && !props.user.username);

    return (
        <Modal
            open={open}
            title={null}
            destroyOnClose={true}
            maskClosable={false}
            onCancel={() => setOpen(false)}
            width={'40%'}
            style={{ minWidth: 700 }}
            footer={null}
        >
            <UserPersonalInfo user={props.user} setUser={props.setUser} />
        </Modal>
    );
}
