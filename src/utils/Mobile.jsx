import { useEffect, useState } from 'react';

export default function useMobile() {
    const [isMobile, setWidth] = useState(window.innerWidth <= 768);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth <= 768);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return isMobile;
}
