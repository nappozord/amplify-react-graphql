import './HomePage.css';
import { Button, Card, Space, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import useMobile from '@utils/Mobile.jsx';
const { Meta } = Card;
const { Text } = Typography;

export default function HomePage() {
    const isMobile = useMobile();

    return (
        <Space
            align={'center'}
            size={'large'}
            style={{ marginTop: '4em', display: 'flex', justifyContent: 'center' }}
            direction={isMobile ? 'vertical' : 'horizontal'}
        >
            <Card
                hoverable
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://img.freepik.com/premium-photo/happy-parents-holding-cute-newborn-girl-mom-dad-baby-portrait-smiling-family-with-newborn-hands-happy-family_139345-164.jpg?w=2000"
                        width={300}
                        height={200}
                    />
                }
            >
                <Meta
                    style={{ textAlign: 'center', margin: -10 }}
                    title={<Text style={{ fontSize: 20 }}>Nascita</Text>}
                />
            </Card>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://www.unicusano.it/blog/wp-content/uploads/2022/08/differenza-tra-laurea-triennale-e-magistrale-min.jpg"
                        width={300}
                        height={200}
                    />
                }
            >
                <Meta
                    style={{ textAlign: 'center', margin: -10 }}
                    title={<Text style={{ fontSize: 20 }}>Laurea</Text>}
                />
            </Card>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://cdn0.weddingwire.com/article/7845/3_2/1280/jpg/15487-bachelor-party-decorations-pixelfit-getty-images.webp"
                        width={300}
                        height={200}
                    />
                }
            >
                <Meta
                    style={{ textAlign: 'center', margin: -10 }}
                    title={<Text style={{ fontSize: 20 }}>Addio al celibato</Text>}
                />
            </Card>
        </Space>
    );
}
