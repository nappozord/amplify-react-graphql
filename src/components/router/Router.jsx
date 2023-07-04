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
import useMobile from '@utils/Mobile.jsx';
import UserLists from '@views/UserLists/UserLists.jsx';
import SingleListView from '@views/UserLists/SingleListView.jsx';

export default function Router(props) {
    const { token } = theme.useToken();
    const isMobile = useMobile();

    const CommonLayout = () => (
        <Layout>
            <HeaderBar
                user={props.user}
                setUser={props.setUser}
                openNotification={props.openNotification}
                categories={props.categories}
                lists={props.lists}
                setLists={props.setLists}
            />
            <Layout>
                <Content>
                    <div style={{ backgroundColor: token.colorPrimaryBg, position: 'relative' }}>
                        <div />
                        <div style={{ height: 500, paddingTop: 50, zIndex: -2 }}>
                            <div
                                style={{
                                    paddingLeft: isMobile ? 0 : '20vw',
                                    paddingRight: isMobile ? 0 : '20vw',
                                    paddingBottom: 50,
                                    minHeight: 'calc(100vh - 50px - 68px - 70px)',
                                }}
                            >
                                <Outlet />
                            </div>
                            <FooterBar />
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
                    element: <HomePage user={props.user} setUser={props.setUser} categories={props.categories} />,
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
                              {
                                  path: 'lists',
                                  children: [
                                      {
                                          index: true,
                                          element: (
                                              <UserLists
                                                  user={props.user}
                                                  setUser={props.setUser}
                                                  openNotification={props.openNotification}
                                                  categories={props.categories}
                                                  lists={props.lists}
                                                  setLists={props.setLists}
                                              />
                                          ),
                                      },
                                      {
                                          path: ':list',
                                          element: (
                                              <SingleListView
                                                  user={props.user}
                                                  setUser={props.setUser}
                                                  openNotification={props.openNotification}
                                                  categories={props.categories}
                                                  lists={props.lists}
                                                  setLists={props.setLists}
                                              />
                                          ),
                                      },
                                  ],
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
