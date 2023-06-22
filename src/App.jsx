import { ConfigProvider, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import locale from 'antd/locale/it_IT';
import { getUser } from './services/apiManager';
import Router from './components/router/Router';

export default function App() {
    const firstUpdate = useRef(true);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!firstUpdate.current) localStorage.setItem('connectedUser', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
            if (connectedUser) {
                setUser(connectedUser);
                setLoading(false);
            } else {
                Auth.currentUserInfo().then((r) => {
                    if (r)
                        getUser(r.attributes.email).then((r) => {
                            setUser(r.data);
                            setLoading(false);
                        });
                    else setLoading(false);
                });
            }
        }
    }, []);

    return (
        <ConfigProvider locale={locale}>
            <Spin spinning={loading} size="large" tip="Effettuando l'accesso...">
                <Router user={user} setUser={setUser} />
            </Spin>
        </ConfigProvider>
    );
}
