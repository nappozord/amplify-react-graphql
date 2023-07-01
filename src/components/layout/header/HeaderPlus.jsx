import { RadarChartOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMobile from '@utils/Mobile.jsx';
import NewList from '@components/list/NewList.jsx';
const { Text } = Typography;

export default function HeaderPlus(props) {
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const isMobile = useMobile();

    const items = [
        {
            label: <Text style={{ fontSize: 16 }}>Nuova Lista</Text>,
            icon: <ProfileOutlined style={{ fontSize: 20, marginRight: 16 }} />,
            key: 'new',
        },
        {
            label: <Text style={{ fontSize: 16 }}>Esplora</Text>,
            icon: <RadarChartOutlined style={{ fontSize: 20, marginRight: 16 }} />,
            key: 'trend',
        },
    ];

    const selectItem = (e) => {
        switch (e.key) {
            case 'new':
                setOpenNew(true);
                break;
            case 'trend':
                navigate('/comingsoon');
                break;
        }
    };

    return (
        <>
            <Tooltip
                placement="bottom"
                title={'Crea'}
                mouseEnterDelay={0.1}
                open={isMobile ? false : tooltip}
                onOpenChange={(value) => setTooltip(value)}
            >
                <Dropdown
                    placement={'bottomRight'}
                    menu={{ items, onClick: selectItem }}
                    trigger={['click']}
                    onOpenChange={() => {
                        if (tooltip) setTooltip(false);
                    }}
                >
                    <Button shape={'circle'} icon={<PlusOutlined />} style={{ marginRight: 16 }} type={'primary'} />
                </Dropdown>
            </Tooltip>
            <NewList
                open={openNew}
                setOpen={setOpenNew}
                user={props.user}
                categories={props.categories}
                openNotification={props.openNotification}
                lists={props.lists}
                setLists={props.setLists}
            />
        </>
    );
}
