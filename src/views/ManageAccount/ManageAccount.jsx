import { Card } from 'antd';
import React, { useState } from 'react';
import ComingSoon from '../Errors/ComingSoon';
import UserPersonalInfo from '../../components/manageAccount/UserPersonalInfo';
import useMobile from '@utils/Mobile.jsx';

const tabListNoTitle = [
    {
        key: 'account',
        label: 'Account',
    },
    {
        key: 'notification',
        label: 'Notifiche',
    },
    {
        key: 'privacy',
        label: 'Privacy',
    },
    {
        key: 'advanced',
        label: 'Impostazioni Avanzate',
    },
];

export default function ManageAccount(props) {
    const [activeTabKey, setActiveTabKey] = useState('account');
    const isMobile = useMobile();

    const items = {
        account: (
            <UserPersonalInfo user={props.user} setUser={props.setUser} openNotification={props.openNotification} />
        ),
        notification: <ComingSoon />,
        privacy: <ComingSoon />,
        advanced: <ComingSoon />,
    };

    const onChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card
                style={{ width: isMobile ? '95%' : '70%' }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                onTabChange={onChange}
            >
                {items[activeTabKey]}
            </Card>
        </div>
    );
}
