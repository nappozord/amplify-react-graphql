import {ConfigProvider, Layout, Spin, theme} from 'antd';
import HeaderBar from './components/layout/header/HeaderBar';
import FooterBar from './components/layout/footer/FooterBar';
import HomePage from './views/HomePage/HomePage';
import { Content } from 'antd/es/layout/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import './App.css';
import {getUser} from "./services/apiManager";

export default function App() {
    const { token } = theme.useToken();
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
                if (r && r.attributes && r.attributes.nickname) {
                    r.username = r.attributes.nickname;
                }
                Auth.currentSession().then(data => {
                    getUser(r.attributes.email, data.accessToken.jwtToken)
                        .then((r) => {
                            console.log(r);
                        })
                        .catch((e) => console.log(e));
                });
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
                            <div style={{ backgroundColor: token.colorPrimaryBg, position: 'relative', marginTop: -64 }}>
                                <div style={{ height: 64 }} />
                                <div style={{ height: 500, paddingLeft: "20vh", paddingRight: "20vh", paddingTop: 50 }} >
                                    <RouterProvider router={router} />
                                </div>
                                <div className="curved-mask-top" />
                            </div>
                        </Content>
                    </Layout>
                    <FooterBar />
                </Spin>
            </Layout>
        </ConfigProvider>
    );
}
