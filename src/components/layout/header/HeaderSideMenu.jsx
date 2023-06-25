import { Avatar, Button, Drawer, Image, Menu, Space, Typography } from 'antd';
import {
    AppstoreOutlined,
    BugOutlined,
    ContainerOutlined,
    ExclamationCircleOutlined,
    FireOutlined,
    HistoryOutlined,
    HomeOutlined,
    LikeOutlined,
    MenuOutlined,
    ProfileOutlined,
    QuestionCircleOutlined,
    QuestionOutlined,
    RadarChartOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import logo from '@assets/logo.png';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function HeaderSideMenu(props) {
    const navigate = useNavigate();
    const [drawer, setDrawer] = useState();

    const items = [
        {
            key: 'home',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <HomeOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Home
                    </Text>
                </Space>
            ),
        },
        {
            key: 'categories',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <AppstoreOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Categorie
                    </Text>
                </Space>
            ),
        },
        {
            key: 'trend',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <RadarChartOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Esplora
                    </Text>
                </Space>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'lists',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <ProfileOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Le tue liste
                    </Text>
                </Space>
            ),
        },
        {
            key: 'liked',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <LikeOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Liste salvate
                    </Text>
                </Space>
            ),
        },
        {
            key: 'history',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <HistoryOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Cronologia
                    </Text>
                </Space>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'activities',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <Text strong style={{ fontSize: 18 }}>
                        Le tue attività
                    </Text>
                </Space>
            ),
            children: [
                {
                    key: '1',
                    label: (
                        <Space align={'center'} style={{ marginTop: 0, marginLeft: -24, overflow: 'auto' }}>
                            <Avatar size={32} src={props.user.picture} />
                            <Text strong style={{ fontSize: 16 }}>
                                Lista #1
                            </Text>
                        </Space>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Space align={'center'} style={{ marginTop: 0, marginLeft: -24, overflow: 'auto' }}>
                            <Avatar size={32} src={props.user.picture} />
                            <Text strong style={{ fontSize: 16 }}>
                                Lista #2
                            </Text>
                        </Space>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <Space align={'center'} style={{ marginTop: 0, marginLeft: -24, overflow: 'auto' }}>
                            <Avatar size={32} src={props.user.picture} />
                            <Text strong style={{ fontSize: 16 }}>
                                Lista #3
                            </Text>
                        </Space>
                    ),
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'settings',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <SettingOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Impostazioni
                    </Text>
                </Space>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'guide',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <QuestionCircleOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Guida
                    </Text>
                </Space>
            ),
        },
        {
            key: 'bugs',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <BugOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Segnalazioni
                    </Text>
                </Space>
            ),
        },
        {
            key: 'feedback',
            label: (
                <Space align={'center'} style={{ marginTop: 4 }}>
                    <ExclamationCircleOutlined style={{ fontSize: 20, paddingRight: 16 }} />
                    <Text strong style={{ fontSize: 16 }}>
                        Feedback
                    </Text>
                </Space>
            ),
        },
        {
            type: 'divider',
        },
    ];

    const onClick = (e) => {
        navigate('/comingsoon');
        setDrawer(false);
    };

    return (
        <>
            <Button
                shape={'circle'}
                icon={<MenuOutlined />}
                style={{ marginRight: 16 }}
                type={'primary'}
                onClick={() => setDrawer(true)}
            />
            <Drawer
                title={<Image preview={false} width={100} src={logo} />}
                width={250}
                placement={'left'}
                closable={false}
                open={drawer}
                destroyOnClose={true}
                onClose={() => setDrawer(!drawer)}
                bodyStyle={{ padding: 0 }}
            >
                <Menu
                    onClick={onClick}
                    style={{ width: '100%' }}
                    mode="inline"
                    items={items}
                    defaultOpenKeys={['activities']}
                />
            </Drawer>
        </>
    );
}
