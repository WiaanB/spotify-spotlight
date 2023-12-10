import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

import PlaylistPicker from './playlist-picker';
import Options from './options';
import ResultView from './result-view';

const Compare: React.FC = () => {
    const [content, setContent] = useState<React.ReactNode>(<></>);
    const [step, setStep] = useState<number>(0);
    const [playlists, setPlaylists] = useState<string[]>([]);

    const stepOptions = ["Pick Playlists", "Select Options", "Enjoy"];

    useEffect(() => {
        switch (step) {
            case 0:
                setContent(<PlaylistPicker playlists={playlists} onChange={setPlaylists} />);
                break;
            case 1:
                setContent(<Options />);
                break;
            case 2:
                setContent(<ResultView />);
                break;
        }
    }, [step, playlists])

    function handleStep(step: number) {
        setStep(s => s + step);
    }

    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <div className="flex items-center">
                <button className="btn text-white" disabled={step == 0} onClick={() => handleStep(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
                </button>
                <ul className="steps w-[40vw] my-[10vh]">
                    {stepOptions.map((option, index) => {
                        return <li key={option} className={`step ${index <= step ? 'step-primary' : ''}`}>{option}</li>
                    })}
                </ul>
                <button className="btn text-white" disabled={step == (stepOptions.length - 1)} onClick={() => handleStep(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                </button>
            </div>
            {content}
        </div>
    )
}

export default Compare;