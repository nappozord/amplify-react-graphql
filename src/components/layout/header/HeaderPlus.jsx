import { RadarChartOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

export default function HeaderPlus(props) {
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState();

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
                navigate('/comingsoon');
                break;
            case 'trend':
                navigate('/comingsoon');
                break;
        }
    };

    return (
        <Tooltip
            placement="bottom"
            title={'Crea'}
            mouseEnterDelay={0.1}
            open={tooltip}
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
    );
}
