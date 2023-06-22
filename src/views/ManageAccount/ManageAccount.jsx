import { Card } from 'antd';
import React, { useState } from 'react';
import ComingSoon from '../Errors/ComingSoon';
import UserPersonalInfo from '../../components/manageAccount/UserPersonalInfo';

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

    const items = {
        account: <UserPersonalInfo user={props.user} setUser={props.setUser} />,
        notification: <ComingSoon />,
        privacy: <ComingSoon />,
        advanced: <ComingSoon />,
    };

    const onChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '70%' }} tabList={tabListNoTitle} activeTabKey={activeTabKey} onTabChange={onChange}>
                {items[activeTabKey]}
            </Card>
        </div>
    );
}
