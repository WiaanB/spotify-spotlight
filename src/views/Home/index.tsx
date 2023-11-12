import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Toast from '@/components/toast';

import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const user = useAuth();
    useEffect(() => {
        if (searchParams.get('welcome') === 'true') {
            setShowToast(true);
            setToastMessage(`Welcome ${user.display_name}!`);
        }
    }, []);

    function resetToast(set: boolean) {
        setShowToast(set);
        setToastMessage('');
        setShowToast(false);
    }

    return (
        <div>
            <Navbar />
            {showToast && <Toast show={showToast} message={toastMessage} handleToast={resetToast} />}
        </div>
    )
}

export default Home;