import {
    Form,
    Input,
    Button,
    Typography,
    Space,
    Avatar,
    Row,
    Col,
    Select,
    DatePicker,
    Divider,
    Badge,
    Modal,
} from 'antd';
import React, { useState } from 'react';
import getColor from '../../utils/Colors';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { SaveOutlined } from '@ant-design/icons';
import { postUser } from '../../services/apiManager';
import 'dayjs/plugin/updateLocale';

const { Text, Title } = Typography;
const { Option } = Select;

export default function UserPersonalInfo(props) {
    const [modal, setModal] = useState();
    const [newImage, setNewImage] = useState();

    console.log(props);

    const onFinish = (values) => {
        let u = {
            ...props.user,
            username: values.username,
            given_name: values.given_name,
            family_name: values.family_name,
            phone: values.phone ? values.prefix + values.phone : '',
            gender: values.gender,
            birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
        };
        props.setUser(u);
        postUser(u).catch((e) => console.log(e));
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="39">+39</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div style={{ width: '100%' }}>
            <Row>
                <Title style={{ marginTop: '0.5em' }} level={2}>
                    Aggiorna i tuoi dati di profilo
                </Title>
            </Row>
            <Divider />
            <Row gutter={50}>
                <Col span={12}>
                    <Form
                        name="basic"
                        layout={'vertical'}
                        initialValues={{
                            prefix: props.user.phone ? props.user.phone.slice(0, 2) : '39',
                            gender: 'other',
                            ...props.user,
                            phone: props.user.phone ? props.user.phone.substring(2) : null,
                            birth_date: props.user.birth_date ? dayjs(Date.parse(props.user.birth_date)) : null,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item labelAlign={'left'} label={<Text strong>Username</Text>} name="username">
                            {props.user.username ? (
                                <Text strong style={{ fontSize: 18 }}>
                                    {props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}
                                </Text>
                            ) : (
                                <Input placeholder={'Username'} />
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginTop: -14, marginBottom: -14 }}>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                label={<Text strong>Nome</Text>}
                                name="given_name"
                            >
                                <Input placeholder={'Nome'} />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
                                label={<Text strong>Cognome</Text>}
                                name="family_name"
                            >
                                <Input placeholder={'Cognome'} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            style={{ marginTop: -14 }}
                            labelAlign={'left'}
                            label={<Text strong>Cellulare</Text>}
                            name="phone"
                        >
                            <Input addonBefore={prefixSelector} placeholder={'XXXXXXXXXX'} />
                        </Form.Item>
                        <Form.Item
                            style={{ marginTop: -14 }}
                            labelAlign={'left'}
                            label={<Text strong>Genere</Text>}
                            name="gender"
                        >
                            <Select placeholder={'Seleziona un genere'}>
                                <Option value="man">Uomo</Option>
                                <Option value="woman">Donna</Option>
                                <Option value="other">Altro</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginTop: -14 }}
                            labelAlign={'left'}
                            label={<Text strong>Data di nascita</Text>}
                            name="birth_date"
                        >
                            <DatePicker format={'DD-MM-YYYY'} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: '100%' }} size={'large'} type="primary" htmlType="submit">
                                Aggiorna Profilo
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Space direction={'vertical'} align={'center'} size={'large'}>
                            <a onClick={() => setModal(true)}>
                                <Badge.Ribbon text={<div style={{ margin: 4 }}>Cambia</div>}>
                                    <Avatar
                                        src={props.user.picture}
                                        style={{
                                            backgroundColor: getColor(props.user.email),
                                        }}
                                        size={96 * 2}
                                    >
                                        <div style={{ fontSize: 50 }}>
                                            {props.user.username
                                                ? props.user.username.charAt(0).toUpperCase()
                                                : props.user.email.charAt(0).toUpperCase()}
                                        </div>
                                    </Avatar>
                                </Badge.Ribbon>
                            </a>
                            <Text strong style={{ fontSize: 18 }}>
                                {props.user.email}
                            </Text>
                        </Space>
                    </div>
                </Col>
            </Row>
            <Modal
                title="Cambia foto profilo"
                open={modal}
                onCancel={() => {
                    setModal(false);
                    setNewImage(null);
                }}
                destroyOnClose={true}
                footer={[
                    <Button
                        type={'primary'}
                        block={true}
                        icon={<SaveOutlined />}
                        size="large"
                        key={'save_button_modal_user_profile'}
                        style={{ marginLeft: 0 }}
                        onClick={() => {
                            props.setUser({ ...props.user, picture: newImage });
                            props.user.picture = newImage;
                            postUser(props.user).catch((e) => console.log(e));
                        }}
                    >
                        Salva immagine
                    </Button>,
                ]}
                okButtonProps={{ block: true, icon: <SaveOutlined />, size: 'large', style: { marginLeft: 0 } }}
                okText={'Salva immagine'}
                centered={true}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        src={newImage ? newImage : props.user.picture}
                        style={{
                            backgroundColor: getColor(props.user.email),
                            margin: 28,
                        }}
                        size={96 * 2}
                    >
                        <div style={{ fontSize: 50 }}>
                            {props.user.username
                                ? props.user.username.charAt(0).toUpperCase()
                                : props.user.email.charAt(0).toUpperCase()}
                        </div>
                    </Avatar>
                </div>
                <Input
                    type={'url'}
                    placeholder={"Incolla l'URL dell'immagine"}
                    onChange={(e) => {
                        setNewImage(e.target.value);
                    }}
                />
            </Modal>
        </div>
    );
}
