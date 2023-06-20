import { Avatar, Dropdown, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import getColor from '../../../utils/Colors';
import React from 'react';
import { Auth } from 'aws-amplify';
const { Text } = Typography;

export default function HeaderAvatar(props) {
    const items = [
        {
            label: (
                <Text strong style={{ fontSize: 20 }}>
                    {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                </Text>
            ),
            icon: <UserOutlined style={{ fontSize: 20, marginRight: 16 }} />,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16 }}>Esci</Text>,
            icon: <LogoutOutlined style={{ fontSize: 20, marginRight: 16 }} />,
            key: '9999',
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
            <Dropdown placement={'bottomRight'} menu={{ items, onClick: selectItem }} trigger={['click']}>
                <Avatar
                    style={{
                        backgroundColor: getColor(props.user.username),
                        marginRight: 8,
                        marginLeft: 16,
                        marginTop: -6,
                    }}
                    size="large"
                >
                    {props.user.username.charAt(0).toUpperCase()}
                </Avatar>
                {/*<Space>
                    <Text strong style={{ fontSize: 16, fontWeight: 500 }}>
                        {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                    </Text>
                    <DownOutlined />
                </Space>*/}
            </Dropdown>
        </a>
    );
}
