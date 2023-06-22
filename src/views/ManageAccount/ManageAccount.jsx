import { Card } from 'antd';
import React, { useState } from 'react';
import ComingSoon from "../Errors/ComingSoon";

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

const items = {
    account: (<ComingSoon />),
    notification: (<ComingSoon />),
    privacy: (<ComingSoon />),
    advanced: (<ComingSoon />),
};

export default function ManageAccount(props) {
    const [activeTabKey, setActiveTabKey] = useState('account');

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
