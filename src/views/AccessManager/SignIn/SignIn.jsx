import { Alert, Button, Divider, Form, Input } from 'antd';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import { useState } from 'react';

export default function SignIn(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);

    const onSignIn = () => {
        if (!username || !password) setError('Inserisci username e password');
        else {
            setLoading(true);
            Auth.signIn(username, password)
                .then((r) => {
                    setLoading(false);
                    setError(null);
                    props.setUser(r);
                    props.setDrawer(false);
                })
                .catch((e) => {
                    setLoading(false);
                    if (e.toString().includes('not confirmed')) {
                        props.setVerification(true);
                        props.setUser({ username });
                    } else {
                        setError('Username o password errati');
                    }
                });
        }
    };

    return (
        <div>
            <Form layout="vertical" style={{ maxWidth: 600 }} autoComplete="off" onFinish={onSignIn}>
                <Form.Item>
                    <Button
                        onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                        size="large"
                        style={{ width: '100%', marginTop: 4 }}
                        icon={<GoogleOutlined />}
                    >
                        Accedi con Google
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Divider style={{ marginTop: -16 }} />
                </Form.Item>
                <Form.Item label="Username" style={{ marginTop: -40 }}>
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
                {error ? <Alert message={error} type="error" style={{ marginBottom: 16 }} showIcon /> : null}
                <Form.Item>
                    <Button htmlType="submit" type="primary" size="large" style={{ width: '100%' }} loading={loading}>
                        Accedi a ListUP!
                    </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="link" htmlType="button" onClick={() => props.setReset(true)}>
                        Password dimenticata?
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}