import '@aws-amplify/ui-react/styles.css';
import { ConfigProvider, Layout, Spin } from 'antd';
import HeaderBar from './components/layout/header/HeaderBar';
import FooterBar from './components/layout/footer/FooterBar';
import HomePage from './views/HomePage/HomePage';
import { Content } from 'antd/es/layout/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';

export default function App() {
    const firstUpdate = useRef(true);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage user={user} setUser={setUser} />,
        },
    ]);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            Auth.currentUserInfo().then((r) => {
                console.log(r);
                if(r.attributes.nickname){
                    r.username = r.attributes.nickname;
                }
                setUser(r);
                setLoading(false);
            });
        }
    }, []);

    return (
        <ConfigProvider>
            <Layout>
                <Spin spinning={loading} size="large" tip="Effettuando l'accesso...">
                    <HeaderBar user={user} setUser={setUser} />
                    <Layout>
                        <Content>
                            <RouterProvider router={router} />
                        </Content>
                    </Layout>
                    <FooterBar />
                </Spin>
            </Layout>
        </ConfigProvider>
    );
}
