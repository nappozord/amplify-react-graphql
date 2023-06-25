import { Layout, notification, theme } from 'antd';
import HeaderBar from '../layout/header/HeaderBar';
import { Content } from 'antd/es/layout/layout';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import FooterBar from '../layout/footer/FooterBar';
import React from 'react';
import HomePage from '../../views/HomePage/HomePage';
import ManageAccount from '../../views/ManageAccount/ManageAccount';
import Error404 from '../../views/Errors/Error404';
import './Router.css';
import ComingSoon from '../../views/Errors/ComingSoon';
import ModalPersonalInfo from '@components/manageAccount/ModalPersonalInfo.jsx';

export default function Router(props) {
    const { token } = theme.useToken();

    const CommonLayout = () => (
        <Layout>
            <HeaderBar user={props.user} setUser={props.setUser} openNotification={props.openNotification} />
            <Layout>
                <Content>
                    <div style={{ backgroundColor: token.colorPrimaryBg, position: 'relative', marginTop: -64 }}>
                        <div style={{ height: 64 }} />
                        <div style={{ height: 500, paddingLeft: '20vw', paddingRight: '20vw', paddingTop: 50 }}>
                            <Outlet />
                        </div>
                        <div className="curved-mask-top" />
                        <ModalPersonalInfo
                            user={props.user}
                            setUser={props.setUser}
                            openNotification={props.openNotification}
                        />
                    </div>
                </Content>
            </Layout>
            <FooterBar />
        </Layout>
    );

    const routers = createBrowserRouter([
        {
            element: <CommonLayout />,
            children: [
                {
                    path: '*',
                    element: <Error404 />,
                },
                {
                    path: '/',
                    element: <HomePage user={props.user} setUser={props.setUser} />,
                },
                props.user
                    ? {
                          path: '/user/:email',
                          children: [
                              {
                                  path: 'personal-info',
                                  element: (
                                      <ManageAccount
                                          user={props.user}
                                          setUser={props.setUser}
                                          openNotification={props.openNotification}
                                      />
                                  ),
                              },
                          ],
                      }
                    : {},
                {
                    path: '/comingsoon',
                    element: <ComingSoon />,
                },
            ],
        },
    ]);

    return <RouterProvider router={routers} />;
}
