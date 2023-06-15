import React, { useState } from 'react';
import { Button, Drawer, Image, Layout, Menu, Select, Input, Avatar } from 'antd';
import { FireFilled, QuestionCircleFilled, LoginOutlined } from '@ant-design/icons';
import logo from '@assets/logo.png';
import './HeaderBar.css';
import AccessManager from '../../../views/AccessManager/AccessManager';
import getColor from '../../../utils/Colors';
import HeaderAvatar from './HeaderAvatar';

const { Option } = Select;
const { Header } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<span className="menu-label">Esplora ListUP!</span>, '1', <FireFilled style={{ fontSize: 20 }} />),
    /*getItem(
        <span className="menu-label">Categorie di tendenza</span>,
        'sub1',
        <FundFilled style={{ fontSize: 20 }} />,
        [getItem('Nascita', '3'), getItem('Laurea', '4'), getItem('Addio al celibato', '5')],
    ),
    getItem(<span className="menu-label">Prodotti consigliati</span>, '9', <LikeFilled style={{ fontSize: 20 }} />),*/
    getItem(<span className="menu-label">Come funziona</span>, '2', <QuestionCircleFilled style={{ fontSize: 20 }} />),
];

const selectCategory = (
    <Select defaultValue="Tutte le categorie" style={{ backgroundColor: '#f0f0f0', minWidth: 150 }}>
        <Option value="Tutte le categorie">Tutte le categorie</Option>
        <Option value="Nascita">Nascita</Option>
        <Option value="Laurea">Laurea</Option>
        <Option value="Addio al celibato">Addio al celibato</Option>
    </Select>
);

export default function HeaderBar(props) {
    const [drawer, setDrawer] = useState(false);

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
            <Image preview={false} width={128} src={logo} />
            <div style={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
                <Search
                    size="large"
                    placeholder="Inizia la ricerca!"
                    addonBefore={selectCategory}
                    onSearch={() => {}}
                    enterButton
                    style={{ marginTop: 16, width: '60%' }}
                />
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{
                        borderBottom: 0,
                        marginLeft: 16,
                        backgroundColor: 'transparent',
                    }}
                />
            </div>
            {!props.user ? (
                <div style={{ right: 40, position: 'absolute' }}>
                    <div style={{ marginTop: 4 }}>
                        <Button size="large" type="primary" icon={<LoginOutlined />} onClick={() => setDrawer(!drawer)}>
                            <span className="menu-label">Accedi</span>
                        </Button>
                    </div>
                    <Drawer
                        closable={false}
                        title={<AccessManager setDrawer={setDrawer} setUser={props.setUser} user={props.user} />}
                        open={drawer}
                        destroyOnClose={true}
                        onClose={() => setDrawer(!drawer)}
                    />
                </div>
            ) : (
                <div style={{ right: 40, position: 'absolute' }}>
                    <HeaderAvatar user={props.user} setUser={props.setUser} />
                </div>
            )}
        </Header>
    );
}
