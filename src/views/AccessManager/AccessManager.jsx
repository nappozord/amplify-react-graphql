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
            children: <SignUp setVerification={setVerification} setUser={props.setUser} />,
        },
    ];

    return (
        <div style={{ height: '90vh' }}>
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
                                          username={props.user.username}
                                          setDrawer={props.setDrawer}
                                          setUser={props.setUser}
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
                                  children: <PasswordReset setDrawer={props.setDrawer} setUser={props.setUser} />,
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
