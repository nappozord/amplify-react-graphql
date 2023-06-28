import './HomePage.css';
import { Button, Card, Space, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import useMobile from '@utils/Mobile.jsx';
const { Meta } = Card;
const { Text } = Typography;

export default function HomePage(props) {
    const isMobile = useMobile();

    let items = [];

    if (props.categories)
        props.categories.forEach((c) => {
            items.push(
                <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" src={c.picture_preview} width={300} height={200} />}
                >
                    <Meta
                        style={{ textAlign: 'center', margin: -10 }}
                        title={<Text style={{ fontSize: 20 }}>{c.name_it}</Text>}
                    />
                </Card>,
            );
        });

    return (
        <Space
            align={'center'}
            size={'large'}
            style={{ paddingTop: isMobile ? '1em' : '4em', display: 'flex', justifyContent: 'center' }}
            direction={isMobile ? 'vertical' : 'horizontal'}
        >
            {items}
        </Space>
    );
}
