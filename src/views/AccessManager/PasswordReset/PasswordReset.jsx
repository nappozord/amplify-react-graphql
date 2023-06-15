import { Alert, Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';

export default function PasswordReset(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [code, setCode] = useState();
    const [loading, setLoading] = useState();
    const [errorUsername, setErrorUsername] = useState(null);
    const [error, setError] = useState(null);
    const [validUsername, setValidUsername] = useState(false);

    const onFinish = () => {
        if (!validUsername) {
            setLoading(true);
            Auth.forgotPassword(username)
                .then((r) => {
                    setLoading(false);
                    setErrorUsername(null);
                    setValidUsername(true);
                    props.setUser({ username, toConfirm: true });
                })
                .catch(() => {
                    setLoading(false);
                    setErrorUsername('Utente non registrato');
                });
        } else {
            if (password === confirmPassword) {
                setLoading(true);
                Auth.forgotPasswordSubmit(username, code, password)
                    .then((r) => {
                        Auth.signIn(username, password)
                            .then(r => {
                                setLoading(false);
                                setError(null);
                                props.setUser(r);
                                props.setDrawer(false);
                            });
                    })
                    .catch(() => {
                        setLoading(false);
                        setError('Codice non valido');
                    });
            } else {
                setError('Le password non coincidono');
            }
        }
    };

    return (
        <div>
            <Form layout="vertical" style={{ maxWidth: 600 }} autoComplete="off" onFinish={onFinish}>
                {!validUsername ? (
                    <Form.Item>
                        <Alert message={'Inserisci il tuo nome utente.'} type="info" />
                    </Form.Item>
                ) : null}
                <Form.Item label="Username" style={!validUsername ? { marginTop: -16 } : null}>
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        size="large"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        disabled={validUsername}
                    />
                </Form.Item>
                {errorUsername ? (
                    <Alert message={errorUsername} type="error" style={{ marginBottom: 16 }} showIcon />
                ) : null}
                {validUsername ? (
                    <>
                        <Form.Item style={{ marginTop: -8 }}>
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
                        <Form.Item style={{ marginTop: -16 }} label=" Nuova Password">
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Nuova Password"
                                size="large"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ marginTop: -16 }} label="Conferma Password">
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Conferma Password"
                                size="large"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </Form.Item>
                        {error ? <Alert message={error} type="error" style={{ marginBottom: 16 }} showIcon /> : null}
                    </>
                ) : null}
                <Form.Item>
                    <Button htmlType="submit" type="primary" size="large" style={{ width: '100%' }} loading={loading}>
                        Conferma
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
