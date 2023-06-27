import { Button, Form } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import { useState } from 'react';

export default function FederatedSignIn(props) {
    const [loading, setLoading] = useState(false);

    return (
        <Form.Item>
            <Button
                loading={loading}
                onClick={() => {
                    setLoading(true);
                    Auth.federatedSignIn({ provider: 'Google' });
                }}
                size="large"
                style={{ width: '100%', marginTop: 4 }}
                icon={<GoogleOutlined />}
            >
                {props.text}
            </Button>
        </Form.Item>
    );
}
