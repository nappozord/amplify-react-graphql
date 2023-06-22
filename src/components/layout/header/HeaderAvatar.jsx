import { Avatar, Dropdown, Space, Typography } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    SolutionOutlined,
    SettingOutlined,
    FormOutlined,
    QuestionCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import getColor from '../../../utils/Colors';
import React from 'react';
import { Auth } from 'aws-amplify';
const { Text } = Typography;

export default function HeaderAvatar(props) {
    const navigate = useNavigate();

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
                            <Text style={{ fontSize: 16 }} strong type={'secondary'}>
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
            key: 'userinfo',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Il tuo profilo</Text>,
            icon: <SolutionOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'profile',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Gestisci account</Text>,
            icon: <FormOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'management',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Esci</Text>,
            icon: <LogoutOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'logout',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Impostazioni</Text>,
            icon: <SettingOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'setting',
        },
        {
            type: 'divider',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Guida</Text>,
            icon: <QuestionCircleOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'guide',
        },
        {
            label: <Text style={{ fontSize: 16, marginRight: 6 }}>Feedback</Text>,
            icon: <ExclamationCircleOutlined style={{ fontSize: 20, marginRight: 20, marginLeft: 6 }} />,
            key: 'feedback',
        },
    ];

    const selectItem = (e) => {
        switch (e.key) {
            case 'logout':
                signOut();
                break;
            case 'management':
                navigate('/user/' + props.user.email + '/personal-info');
                break;
            case 'profile':
                navigate('/comingsoon');
                break;
            case 'setting':
                navigate('/comingsoon');
                break;
            case 'guide':
                navigate('/comingsoon');
                break;
            case 'feedback':
                navigate('/comingsoon');
                break;
        }
    };

    const signOut = () => {
        localStorage.removeItem('connectedUser');
        props.setUser(null);
        navigate('/');
        Auth.signOut().catch((e) => console.log(e));
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
