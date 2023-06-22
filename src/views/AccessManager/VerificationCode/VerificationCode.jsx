import { Alert, Button, Divider, Form, Input, Tabs } from 'antd';
import { GoogleOutlined, HolderOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import ResendCode from '../../../components/authentication/ResendCode';

export default function VerificationCode(props) {
    const [code, setCode] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);

    const onVerification = () => {
        if (!code) setError('Codice non valido');
        else {
            setLoading(true);
            Auth.confirmSignUp(props.user.username, code)
                .then(() => {
                    setError(false);
                    setLoading(false);
                    props.setDrawer(false);
                    props.setUser({
                        ...props.user,
                        toConfirm: false,
                    });
                })
                .catch(() => {
                    setLoading(false);
                    setError('Codice non valido');
                });
        }
    };

    return (
        <div>
            <Form layout="vertical" style={{ maxWidth: 600 }} autoComplete="off">
                <Form.Item>
                    <Alert
                        message={
                            'Controlla la tua mail, ti abbiamo mandato un codice di verifica da inserire qui sotto.'
                        }
                        type="info"
                    />
                </Form.Item>
                <Form.Item style={{ marginTop: -8 }}>
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Codice di verifica"
                        size="large"
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                    />
                </Form.Item>
                {error ? (
                    <Alert message={error} type="error" style={{ marginBottom: 16, marginTop: -8 }} showIcon />
                ) : null}
                <Form.Item>
                    <Button
                        onClick={onVerification}
                        type="primary"
                        size="large"
                        style={{ width: '100%' }}
                        loading={loading}
                    >
                        Conferma Codice
                    </Button>
                </Form.Item>
                <ResendCode username={props.user.username} />
            </Form>
        </div>
    );
}
