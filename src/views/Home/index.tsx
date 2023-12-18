import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Toast from '@/components/toast';

import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [heroContent, setHeroContent] = useState<string>('Hover me');
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

    function handleHeroContent(type: string) {
        if (type === 'hover') setHeroContent('Hover Me');
        else setHeroContent('In molestie scelerisque massa, quis finibus nibh iaculis id. Proin laoreet purus nec ante facilisis fermentum. Phasellus lacinia, est nec mattis varius, nisi urna sagittis neque, eu rutrum mauris lacus vitae libero.');
    }

    return (
        <div>
            <Navbar />
            <div className="hero h-[90vh]" style={{ backgroundImage: "url('src/assets/spotify.jpeg')" }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div
                    className="hero-content text-center text-neutral-content bg-opacity-20 hover:bg-opacity-100 hover:bg-slate-100 rounded-2xl hover:text-slate-950"
                    onMouseEnter={() => handleHeroContent('lorem')}
                    onMouseLeave={() => handleHeroContent('hover')}
                >
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5 min-h-[100px]">
                            {heroContent}
                        </p>
                    </div>
                </div>
            </div>
            {showToast && <Toast show={showToast} message={toastMessage} handleToast={resetToast} />}
        </div>
    )
}

export default Home;