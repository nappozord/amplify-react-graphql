import { Avatar, Dropdown, Space, Typography } from 'antd';
import { DownOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import getColor from '../../../utils/Colors';
import React from 'react';
import { Auth } from 'aws-amplify';
const { Text } = Typography;

export default function HeaderAvatar(props) {
    const items = [
        {
            label: <div>{props.user.attributes.email}</div>,
            icon: <MailOutlined />,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            icon: <LogoutOutlined />,
            key: '9999',
            danger: true,
        },
    ];

    const selectItem = (e) => {
        switch (e.key) {
            case '9999':
                signOut();
                break;
            case '0':
                break;
        }
    };

    const signOut = () => {
        Auth.signOut().then((r) => {
            props.setUser(null);
        });
    };

    return (
        <a style={{ color: 'inherit' }}>
            <Avatar style={{ backgroundColor: getColor(props.user.username), marginRight: 8 }} size="large">
                {props.user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Dropdown menu={{ items, onClick: selectItem }} trigger={['click']}>
                <Space>
                    <Text strong style={{ fontSize: 16, fontWeight: 500 }}>
                        {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                    </Text>
                    <DownOutlined />
                </Space>
            </Dropdown>
        </a>
    );
}
