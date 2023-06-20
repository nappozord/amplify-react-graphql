import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Dropdown, Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
const { Text } = Typography;

const notifications = [
    {
        title: 'Nuova notifica appena arrivata',
        time: '1 giorno fa',
    },
    {
        title: "Un'altra nuova notifica",
        time: '1 giorno fa',
    },
    {
        title: 'Una terza notifica',
        time: '2 giorni fa',
    },
    {
        title: 'E così via',
        time: 'Una settimana fa',
    },
    {
        title: 'Anche questa è nuova',
        time: 'Un mese fa',
    },
];

const items = [];

let i = 0;

notifications.forEach((n) => {
    let notif = (
        <Space direction={'vertical'}>
            <Badge status="processing" text={<Text style={{ fontSize: 16 }}>{n.title}</Text>} />
            <Text type="secondary" style={{ fontSize: 12, paddingLeft: 14 }}>
                {n.time}
            </Text>
        </Space>
    );

    items.push({
        label: notif,
        key: ++i,
    });
});

export default function HeaderNotification(props) {
    const [tooltip, setTooltip] = useState();
    const [notifQty, setNotifQty] = useState(items.length);

    return (
        <Tooltip
            placement="bottom"
            title={'Notifiche'}
            mouseEnterDelay={0.1}
            open={tooltip}
            onOpenChange={(value) => setTooltip(value)}
        >
            <Dropdown
                overlayStyle={{ padding: 0 }}
                placement={'bottomRight'}
                menu={{ items }}
                trigger={['click']}
                onOpenChange={() => {
                    if (tooltip) setTooltip(false);
                }}
            >
                <Badge count={notifQty} overflowCount={9}>
                    <Button
                        shape={'circle'}
                        icon={<NotificationOutlined />}
                        type={'primary'}
                        onClick={() => setNotifQty(0)}
                    />
                </Badge>
            </Dropdown>
        </Tooltip>
    );
}