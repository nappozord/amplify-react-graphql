import { Button, Card, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                <Result
                    status="404"
                    title="Coming Soon!"
                    subTitle="Questo contenuto non è ancora disponibile al momento."
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
