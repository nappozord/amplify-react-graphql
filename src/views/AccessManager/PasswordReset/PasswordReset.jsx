import { Alert, Button, Form, Input } from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import ResendCode from '../../../components/authentication/ResendCode';
import { getUser } from '@services/apiManager.jsx';

export default function PasswordReset(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [code, setCode] = useState();
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(null);
    const [error, setError] = useState(null);
    const [validEmail, setValidEmail] = useState(false);

    const onFinish = () => {
        if (!validEmail) {
            setLoading(true);
            Auth.forgotPassword(email)
                .then(() => {
                    setLoading(false);
                    setErrorEmail(null);
                    setValidEmail(true);
                    props.setUserNotConfirmed({ email });
                })
                .catch(() => {
                    setLoading(false);
                    setErrorEmail('Utente non registrato');
                });
        } else {
            if (password === confirmPassword) {
                setLoading(true);
                Auth.forgotPasswordSubmit(email, code, password)
                    .then((r) => {
                        Auth.signIn(email, password).then((r) => {
                            setLoading(false);
                            setError(null);
                            getUser(email).then(r => {
                                props.setUser(r.data);
                                props.setDrawer(false);
                            })
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
                {!validEmail ? (
                    <Form.Item>
                        <Alert message={'Inserisci il tuo nome utente.'} type="info" />
                    </Form.Item>
                ) : null}
                <Form.Item label="Email" style={!validEmail ? { marginTop: -16 } : null}>
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        disabled={validEmail}
                    />
                </Form.Item>
                {errorEmail ? (
                    <Alert message={errorEmail} type="error" style={{ marginBottom: 16 }} showIcon />
                ) : null}
                {validEmail ? (
                    <>
                        <Form.Item style={{ marginTop: -8 }}>
                            <Alert
                                message={
                                    'Controlla la tua email, ti abbiamo mandato un codice di verifica da inserire qui sotto.'
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
                {validEmail ? <ResendCode email={email} forgotPassword={true} /> : null}
            </Form>
        </div>
    );
}
