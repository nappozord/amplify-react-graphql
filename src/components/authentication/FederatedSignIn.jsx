import { Button, Form } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';

export default function FederatedSignIn(props) {
    return (
        <Form.Item>
            <Button
                onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                size="large"
                style={{ width: '100%', marginTop: 4 }}
                icon={<GoogleOutlined />}
            >
                {props.text}
            </Button>
        </Form.Item>
    );
}
