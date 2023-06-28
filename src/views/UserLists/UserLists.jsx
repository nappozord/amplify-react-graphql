import { Card } from 'antd';
import React from 'react';

export default function UserLists(props) {
    const onChange = () => {};

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: isMobile ? '95%' : '90%' }} onTabChange={onChange}></Card>
        </div>
    );
}
