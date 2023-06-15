import './HomePage.css';
import { theme } from 'antd';

export default function HomePage() {
    const { token } = theme.useToken();

    return (
        <div style={{ backgroundColor: token.colorPrimaryBg, position: 'relative', marginTop: -64 }}>
            <div style={{ height: 500 }} />
            <div className="curved-mask-top" />
        </div>
    );
}
