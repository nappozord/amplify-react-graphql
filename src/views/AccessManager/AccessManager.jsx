import { Tabs } from 'antd';
import React, { useState } from 'react';
import { UserAddOutlined, HolderOutlined } from '@ant-design/icons';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import VerificationCode from './VerificationCode/VerificationCode';
import PasswordReset from './PasswordReset/PasswordReset';

export default function AccessManager(props) {
    const [verification, setVerification] = useState(false);
    const [reset, setReset] = useState();
    const [userNotConfirmed, setUserNotConfirmed] = useState();

    const itemsTab = [
        {
            key: '1',
            label: (
                <div>
                    <HolderOutlined />
                    Accedi
                </div>
            ),
            children: (
                <SignIn
                    setVerification={setVerification}
                    setReset={setReset}
                    setUser={props.setUser}
                    setDrawer={props.setDrawer}
                />
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    <UserAddOutlined />
                    Registrati
                </div>
            ),
            children: <SignUp setVerification={setVerification} setUserNotConfirmed={setUserNotConfirmed} />,
        },
    ];

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                size="large"
                centered={true}
                items={
                    verification
                        ? [
                              {
                                  key: '1',
                                  label: (
                                      <div>
                                          <HolderOutlined />
                                          Codice di Verifica
                                      </div>
                                  ),
                                  children: (
                                      <VerificationCode
                                          user={userNotConfirmed}
                                          setDrawer={props.setDrawer}
                                          setUser={props.setUser}
                                          openNotification={props.openNotification}
                                      />
                                  ),
                              },
                          ]
                        : reset
                        ? [
                              {
                                  key: '1',
                                  label: (
                                      <div>
                                          <HolderOutlined />
                                          Password Dimenticata
                                      </div>
                                  ),
                                  children: (
                                      <PasswordReset
                                          setDrawer={props.setDrawer}
                                          setUserNotConfirmed={setUserNotConfirmed}
                                          setUser={props.setUser}
                                          setReset={props.setReset}
                                          openNotification={props.openNotification}
                                      />
                                  ),
                              },
                          ]
                        : itemsTab
                }
                type="card"
                animated={true}
            />
        </div>
    );
}
