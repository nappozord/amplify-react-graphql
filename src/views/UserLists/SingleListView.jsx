import { Avatar, Button, Card, Image, Segmented, Space, Spin, Typography } from 'antd';
import {
    AppstoreOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    BarsOutlined,
    PlusOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import useMobile from '@utils/Mobile.jsx';
import { useParams } from 'react-router-dom';
import getColor from '@utils/Colors.jsx';
const { Title, Text, Paragraph } = Typography;

export default function SingleListView(props) {
    const findListByName = () => {
        for (let i = 0; i < props.lists.length; ++i) {
            if (props.lists[i].name === listName) {
                return props.lists[i];
            }
        }
    };

    let { list: listName } = useParams();
    const isMobile = useMobile();
    const [openNew, setOpenNew] = useState(false);
    const [list] = useState(findListByName());

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {list ? (
                <Card
                    style={{ width: isMobile ? '95%' : '95%' }}
                    title={
                        <Title level={2} style={{ marginTop: 14 }}>
                            {listName}
                        </Title>
                    }
                    cover={
                        list.picture !== 'None' ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    borderRadius: '8px 8px 0 0',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    alt="example"
                                    src={list.picture}
                                    width={'100%'}
                                    height={250}
                                    style={{ filter: 'blur(8px)' }}
                                />
                                <div style={{ position: 'absolute' }}>
                                    <Image
                                        alt="example"
                                        src={list.picture}
                                        width={350}
                                        height={250}
                                        style={{ borderRadius: 0 }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: getColor('Nuova Lista'),
                                    borderRadius: '8px 8px 0 0',
                                }}
                            >
                                <Avatar
                                    shape="square"
                                    style={{
                                        backgroundColor: getColor('Nuova Lista'),
                                    }}
                                    size={200}
                                >
                                    <ProfileOutlined style={{ fontSize: 100, marginTop: '45%' }} />
                                </Avatar>
                            </div>
                        )
                    }
                    extra={
                        <Space>
                            <Segmented
                                size={'large'}
                                options={[
                                    {
                                        value: 'Kanban',
                                        icon: <ArrowUpOutlined />,
                                    },
                                    {
                                        value: 'List',
                                        icon: <ArrowDownOutlined />,
                                    },
                                ]}
                            />
                            <Segmented
                                size={'large'}
                                options={[
                                    {
                                        value: 'Kanban',
                                        icon: <AppstoreOutlined />,
                                    },
                                    {
                                        value: 'List',
                                        icon: <BarsOutlined />,
                                    },
                                ]}
                            />
                            <Button
                                type={'primary'}
                                size={'large'}
                                icon={<PlusOutlined />}
                                onClick={() => setOpenNew(true)}
                            >
                                Aggiungi prodotto
                            </Button>
                        </Space>
                    }
                ></Card>
            ) : (
                <Card style={{ width: isMobile ? '95%' : '95%' }}>
                    <Spin />
                </Card>
            )}
        </div>
    );
}
