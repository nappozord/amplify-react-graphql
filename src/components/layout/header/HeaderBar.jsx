import React, { useState } from 'react';
import { Button, Drawer, Image, Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/logo.png';
import './HeaderBar.css';
import AccessManager from '../../../views/AccessManager/AccessManager';
import HeaderAvatar from './HeaderAvatar';
import HeaderPlus from './HeaderPlus';
import HeaderNotification from './HeaderNotification';
import HeaderSearch from './HeaderSearch';
import HeaderSideMenu from './HeaderSideMenu';

const { Header } = Layout;

export default function HeaderBar(props) {
    const [drawer, setDrawer] = useState(false);
    const navigate = useNavigate();

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                backgroundColor: 'transparent',
                height: 58,
                paddingLeft: 40,
                paddingRight: 40,
            }}
        >
            <div style={{ position: 'absolute' }}>
                {props.user ? <HeaderSideMenu user={props.user} /> : null}
                <a>
                    <Image
                        preview={false}
                        width={124}
                        src={logo}
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                </a>
            </div>
            <HeaderSearch />
            {!props.user ? (
                <div style={{ right: 40, position: 'absolute' }}>
                    <div style={{ marginTop: 4 }}>
                        <Button size="large" type="primary" icon={<LoginOutlined />} onClick={() => setDrawer(true)}>
                            <span className="menu-label">Accedi</span>
                        </Button>
                    </div>
                    <Drawer
                        closable={false}
                        title={
                            <AccessManager
                                setDrawer={setDrawer}
                                setUser={props.setUser}
                                user={props.user}
                                openNotification={props.openNotification}
                            />
                        }
                        open={drawer}
                        destroyOnClose={true}
                        onClose={() => setDrawer(!drawer)}
                    />
                </div>
            ) : (
                <div style={{ right: 40, position: 'absolute' }}>
                    <HeaderPlus user={props.user} />
                    <HeaderNotification user={props.user} />
                    <HeaderAvatar user={props.user} setUser={props.setUser} />
                </div>
            )}
        </Header>
    );
}
