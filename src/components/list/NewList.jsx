import { Avatar, Badge, Button, Col, Divider, Form, Input, Modal, Row, Select, Space, Typography } from 'antd';
import useMobile from '@utils/Mobile.jsx';
import getColor from '@utils/Colors.jsx';
import React, { useState } from 'react';
import { ProfileOutlined } from '@ant-design/icons';
import { postList } from '@services/apiManager.jsx';
const { Text, Title } = Typography;
const { TextArea } = Input;

export default function NewList(props) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const isMobile = useMobile();

    const options = [{ value: 'no', label: 'Nessuna' }];

    if (props.categories)
        props.categories.forEach((c) => {
            options.push({ value: c.idcategories, label: c.name_it });
        });

    const onFinish = (values) => {
        let list = {
            idusers: props.user.idusers,
            idcategory: values.category,
            name: values.name,
            description: values.description,
            picture: image,
        };

        setLoading(true);

        postList(list).then((r) => {
            console.log(r);
            setImage(null);
            setLoading(false);
            props.setOpen(false);
        });
    };

    return (
        <Modal
            width={'40vw'}
            style={{ minHeight: '50vh' }}
            title={
                <>
                    <Title level={2} style={{ marginTop: 0 }}>
                        Crea una nuova lista
                    </Title>
                    <Divider />
                </>
            }
            destroyOnClose={true}
            open={props.open}
            onCancel={() => props.setOpen(false)}
            centered={true}
            footer={null}
        >
            <div style={{ width: '100%' }}>
                <Row gutter={50}>
                    <Col span={isMobile ? 24 : 12}>
                        <Form
                            name="basic"
                            layout={'vertical'}
                            onFinish={onFinish}
                            autoComplete="off"
                            initialValues={{ category: 'no' }}
                        >
                            <Form.Item
                                labelAlign={'left'}
                                label={<Text strong>Nome della lista</Text>}
                                name="name"
                                tooltip={'La tua lista è pubblica di default'}
                            >
                                <Input placeholder={'La mia lista'} />
                            </Form.Item>
                            <Form.Item
                                style={{ marginTop: -14 }}
                                labelAlign={'left'}
                                label={<Text strong>Categoria</Text>}
                                name="category"
                            >
                                <Select placeholder={'Seleziona una categoria'} options={options} />
                            </Form.Item>
                            <Form.Item style={{ marginTop: -14, marginBottom: 0 }}>
                                <Form.Item label={<Text strong>Descrizione</Text>} name="description">
                                    <TextArea placeholder={'Descrizione'} autoSize={{ minRows: 2 }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    style={{ width: '100%' }}
                                    size={'large'}
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Crea Lista
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={isMobile ? 24 : 12}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Space direction={'vertical'} align={'left'}>
                                <Text strong style={{ fontSize: 14, marginBottom: -14 }}>
                                    Immagine di testata
                                </Text>
                                <Avatar
                                    shape="square"
                                    src={image}
                                    style={{
                                        backgroundColor: getColor('Nuova Lista'),
                                    }}
                                    size={96 * 2}
                                >
                                    <ProfileOutlined style={{ fontSize: 100, marginTop: '45%' }} />
                                </Avatar>
                                <Input
                                    placeholder={'URL immagine'}
                                    style={{ marginTop: 14 }}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}
