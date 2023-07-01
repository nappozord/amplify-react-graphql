import { Avatar, Badge, Button, Card, Col, Progress, Row, Segmented, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import useMobile from '@utils/Mobile.jsx';
import {
    AppstoreOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    BarsOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ProfileOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import NewList from '@components/list/NewList.jsx';
import getColor from '@utils/Colors.jsx';
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
export default function UserLists(props) {
    const [openNew, setOpenNew] = useState(false);
    const isMobile = useMobile();

    const findCategoryById = (id) => {
        for (let i = 0; i < props.categories.length; ++i) {
            if (props.categories[i].idcategories === id) {
                return props.categories[i].name_it;
            }
        }

        return 'Nessuna categoria';
    };

    let column_length = 3;

    if (isMobile) column_length = 1;

    let items = [];

    for (let i = 0; i <= props.lists.length; i = i + column_length) {
        let columns = [];
        for (let j = 0; j < column_length; ++j) {
            if (props.lists[j + i])
                columns.push(
                    <Col span={8} key={props.lists[j + i].idlists}>
                        <Badge.Ribbon
                            text={
                                <div style={{ margin: 6, fontSize: 16 }}>
                                    {findCategoryById(props.lists[j + i].idcategory)}
                                </div>
                            }
                        >
                            <Card
                                hoverable={true}
                                actions={[
                                    <div style={{ marginTop: -6, marginBottom: -6 }}>
                                        <SettingOutlined key={'settings'} />
                                    </div>,
                                    <div style={{ marginTop: -6, marginBottom: -6 }}>
                                        <EditOutlined key={'edit'} />
                                    </div>,
                                    <div style={{ marginTop: -6, marginBottom: -6 }}>
                                        <DeleteOutlined key={'delete'} />
                                    </div>,
                                ]}
                                bodyStyle={{ padding: 8 }}
                                cover={
                                    props.lists[j + i].picture !== 'None' ? (
                                        <img alt="example" src={props.lists[j + i].picture} width={300} height={200} />
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
                            >
                                <Row>
                                    <Col span={18}>
                                        <Title
                                            strong={true}
                                            style={{ fontSize: 16, marginTop: 4 }}
                                            ellipsis={{ rows: 1, tooltip: props.lists[j + i].name }}
                                        >
                                            {props.lists[j + i].name}
                                        </Title>
                                        <Paragraph
                                            type={'secondary'}
                                            ellipsis={{ rows: 1, tooltip: props.lists[j + i].description }}
                                        >
                                            {props.lists[j + i].description}
                                        </Paragraph>
                                    </Col>
                                    <Col span={6}>
                                        <Progress type="circle" percent={30} size={60} style={{ float: 'right' }} />
                                    </Col>
                                </Row>
                            </Card>
                        </Badge.Ribbon>
                    </Col>,
                );
        }
        items.push(
            <Row gutter={16} key={'list_row_' + i} style={{ marginBottom: 16 }}>
                {columns}
            </Row>,
        );
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card
                style={{ width: isMobile ? '95%' : '95%' }}
                title={
                    <Title level={2} style={{ marginTop: 14 }}>
                        Le tue liste
                    </Title>
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
                            Nuova lista
                        </Button>
                    </Space>
                }
            >
                {items}
            </Card>
            <NewList
                open={openNew}
                setOpen={setOpenNew}
                user={props.user}
                categories={props.categories}
                openNotification={props.openNotification}
                lists={props.lists}
                setLists={props.setLists}
            />
        </div>
    );
}
