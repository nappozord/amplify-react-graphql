import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Alert, Button, Form } from 'antd';

export default function ResendCode(props) {
    const [codeResent, setCodeResent] = useState(0);

    const resendCode = () => {
        if (props.forgotPassword) {
            Auth.forgotPassword(props.email)
                .then(() => {
                    setCodeResent(1);
                })
                .catch(() => {
                    setCodeResent(2);
                });
        } else {
            Auth.resendSignUp(props.email)
                .then(() => {
                    setCodeResent(1);
                })
                .catch(() => {
                    setCodeResent(2);
                });
        }
    };

    return (
        <div>
            <Form.Item>
                <Button onClick={resendCode} type="default" size="large" style={{ width: '100%', marginTop: -8 }}>
                    Rinvia Codice
                </Button>
            </Form.Item>
            {codeResent === 1 ? (
                <Alert
                    message={'Codice di verifica inviato con successo'}
                    type="success"
                    style={{ marginBottom: 16, marginTop: -8 }}
                    showIcon
                />
            ) : codeResent === 2 ? (
                <Alert
                    message={'Impossibile rinviare il codice di verifica'}
                    type="error"
                    style={{ marginBottom: 16, marginTop: -8 }}
                    showIcon
                />
            ) : null}
        </div>
    );
}
