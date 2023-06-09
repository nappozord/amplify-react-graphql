import { Layout, theme } from 'antd';
import './FooterBar.css';

const { Footer } = Layout;

export default function FooterBar() {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                textAlign: 'center',
                bottom: 0,
                width: '100%',
                backgroundColor: token.colorPrimaryBg,
            }}
        >
            <div className="curved-mask-bottom" />
            <Footer
                style={{
                    backgroundColor: token.colorPrimaryBg,
                }}
            >
                Copyright © 2023 ListUP! Tutti diritti riservati.
            </Footer>
        </div>
    );
}
