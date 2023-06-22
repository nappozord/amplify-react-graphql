import { Alert, Button, Divider, Form, Input } from 'antd';
import { GoogleOutlined, LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import FederatedSignIn from '../../../components/authentication/FederatedSignIn';

export default function SignUp(props) {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);

    const validateData = () => {
        if (!username || !password || !confirmPassword || !email) {
            setError('Inserisci tutti i campi');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Le password non coincidono');
            return false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('Inserisci una mail valida');
            return false;
        }

        return true;
    };

    const onSignUp = () => {
        if (validateData()) {
            setLoading(true);
            Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                },
                autoSignIn: {
                    enabled: true,
                },
            })
                .then((r) => {
                    setLoading(false);
                    setError(null);
                    props.setVerification(true);
                    console.log(r);
                    props.setUser({
                        username,
                        toConfirm: true,
                        attributes: {
                            email,
                        },
                    });
                })
                .catch(() => {
                    setLoading(false);
                    setError('Utente già registrato');
                });
        }
    };

    return (
        <div>
            <Form layout="vertical" style={{ maxWidth: 600 }} autoComplete="off" onFinish={onSignUp}>
                <FederatedSignIn text={'Registrati con Google'} />
                <Form.Item>
                    <Divider style={{ marginTop: -16 }} />
                </Form.Item>
                <Form.Item label="Email" style={{ marginTop: -40 }}>
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Username" style={{ marginTop: -16 }}>
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        size="large"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item style={{ marginTop: -16 }} label="Password">
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
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
                <Form.Item>
                    <Button htmlType="submit" type="primary" size="large" style={{ width: '100%' }} loading={loading}>
                        Registrati a ListUP!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
