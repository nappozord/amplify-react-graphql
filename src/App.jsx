import { ConfigProvider, Layout, Spin, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import './App.css';
import { getUser } from './services/apiManager';
import Router from './components/router/Router';

export default function App() {
    const { token } = theme.useToken();
    const firstUpdate = useRef(true);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
            if (connectedUser) {
                setUser(connectedUser);
                setLoading(false);
            } else {
                Auth.currentUserInfo().then((r) => {
                    console.log(r);
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
        <ConfigProvider>
            <Spin spinning={loading} size="large" tip="Effettuando l'accesso...">
                <Router user={user} setUser={setUser} />
            </Spin>
        </ConfigProvider>
    );
}
