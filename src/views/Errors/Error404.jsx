import { Button, Card, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                <Result
                    status="404"
                    title="404"
                    subTitle="La pagina che stai cercando non esiste."
                    extra={
                        <Button
                            type="primary"
                            size={'large'}
                            style={{ width: '100%' }}
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Torna indietro
                        </Button>
                    }
                />
            </Card>
        </div>
    );
}
