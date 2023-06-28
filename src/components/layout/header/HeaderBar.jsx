import React, { useState } from 'react';
import { Button, Drawer, Image, Layout, theme } from 'antd';
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
import useMobile from '@utils/Mobile.jsx';

const { Header } = Layout;

export default function HeaderBar(props) {
    const { token } = theme.useToken();
    const [drawer, setDrawer] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMobile();

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                backgroundColor: token.colorPrimaryBg,
                height: isMobile ? 110 : 58,
                paddingLeft: isMobile ? 10 : 40,
                paddingRight: isMobile ? 10 : 40,
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
            <HeaderSearch categories={props.categories} />
            {!props.user ? (
                <div style={{ right: isMobile ? 10 : 40, position: 'absolute' }}>
                    <div style={{ marginTop: 4 }}>
                        <Button size="large" type="primary" icon={<LoginOutlined />} onClick={() => setDrawer(true)}>
                            <span className="menu-label">Accedi</span>
                        </Button>
                    </div>
                    <Drawer
                        width={isMobile ? '100%' : undefined}
                        closable={false}
                        title={
                            <AccessManager
                                setDrawer={setDrawer}
                                setUser={props.setUser}
                                user={props.user}
                                openNotification={props.openNotification}
                            />
                        }
                        footer={
                            isMobile ? (
                                <Button
                                    style={{ width: '100%' }}
                                    size={'large'}
                                    onClick={() => {
                                        setDrawer(false);
                                    }}
                                >
                                    Chiudi
                                </Button>
                            ) : null
                        }
                        open={drawer}
                        destroyOnClose={true}
                        onClose={() => setDrawer(!drawer)}
                    />
                </div>
            ) : (
                <div style={{ right: isMobile ? 10 : 40, position: 'absolute' }}>
                    <HeaderPlus user={props.user} />
                    <HeaderNotification user={props.user} />
                    <HeaderAvatar user={props.user} setUser={props.setUser} />
                </div>
            )}
        </Header>
    );
}
