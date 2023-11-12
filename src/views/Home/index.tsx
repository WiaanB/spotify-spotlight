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
            <div className="hero h-[90vh]" style={{ backgroundImage: "url('src/assets/spotify.jpeg')" }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                </div>
            </div>
            {showToast && <Toast show={showToast} message={toastMessage} handleToast={resetToast} />}
        </div>
    )
}

export default Home;