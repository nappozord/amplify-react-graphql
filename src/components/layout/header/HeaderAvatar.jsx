import { Avatar, Dropdown, Space, Typography } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    SolutionOutlined,
    SettingOutlined,
    FormOutlined,
    QuestionCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import getColor from '../../../utils/Colors';
import React from 'react';
import { Auth } from 'aws-amplify';
const { Text } = Typography;

export default function HeaderAvatar(props) {
    const items = [
        {
            label: (
                <Space direction={'vertical'}>
                    {props.user.given_name || props.user.family_name ? (
                        <>
                            <Text strong style={{ fontSize: 20 }}>
                                {props.user.given_name.charAt(0).toUpperCase() +
                                    props.user.given_name.slice(1) +
                                    ' ' +
                                    props.user.family_name.charAt(0).toUpperCase() +
                                    props.user.family_name.slice(1)}
                            </Text>
                            <Text style={{ fontSize: 16 }} secondary>
                                {'@' + props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                            </Text>
                        </>
                    ) : (
                        <Text strong style={{ fontSize: 20 }}>
                            {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                        </Text>
                    )}
                </Space>
            ),
            icon: <UserOutlined style={{ fontSize: 30, marginRight: 16 }} />,
            key: 'UserInfo',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Il tuo profilo</Text>,
            icon: <SolutionOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'Profile',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Gestisci account</Text>,
            icon: <FormOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'Management',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Esci</Text>,
            icon: <LogoutOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'Logout',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Impostazioni</Text>,
            icon: <SettingOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'Setting',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Guida</Text>,
            icon: <QuestionCircleOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'Guide',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Feedback</Text>,
            icon: <ExclamationCircleOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'Feedback',
        }
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
                    src={props.user.picture}
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
            </Dropdown>
        </a>
    );
}
