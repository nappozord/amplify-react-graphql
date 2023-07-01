import './HomePage.css';
import { Button, Card, Skeleton, Space, Typography } from 'antd';
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
                    key={c.idcategories}
                    cover={<img alt="example" src={c.picture_preview} width={300} height={200} />}
                >
                    <Meta
                        style={{ textAlign: 'center', margin: -10 }}
                        title={<Text style={{ fontSize: 20 }}>{c.name_it}</Text>}
                    />
                </Card>,
            );
        });
    else
        for (let i = 0; i < 3; ++i)
            items.push(
                <Card
                    hoverable
                    style={{ width: 300 }}
                    key={i}
                    cover={<Skeleton.Image loading={true} active={true} style={{ width: 300, height: 200 }} />}
                >
                    <Skeleton.Input loading={true} active={true} block={true} size={'small'} />
                </Card>,
            );

    return (
        <Space
            direction={'vertical'}
            align={'center'}
            size={'large'}
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <Space
                align={'center'}
                size={'large'}
                style={{ display: 'flex', justifyContent: 'center' }}
                direction={isMobile ? 'vertical' : 'horizontal'}
            >
                {items}
            </Space>
        </Space>
    );
}
