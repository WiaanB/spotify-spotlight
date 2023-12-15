import { useSpotify } from '@/hooks/useSpotify';
import React from 'react';
import { IPlaylist } from './types';

interface IPlaylistPickerProps {
    playlists: IPlaylist[];
    onChange: (playlists: IPlaylist[]) => void;
}

const PlaylistPicker: React.FC<IPlaylistPickerProps> = ({ playlists, onChange }) => {
    const [playlist, setPlaylist] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const sdk = useSpotify();

    const sanitizedPlaylists = async () => {
        if (!sdk || playlist.length === 0) return console.warn('SDK not loaded');
        setLoading(true);
        const parts = playlist.split('/');
        const id = parts[4].split("?")[0];
        const details = await sdk.playlists.getPlaylist(id);
        const newEntry: IPlaylist = {
            id: details.id,
            name: details.name,
            href: details.href,
            tracks: details.tracks?.total
        };
        onChange([...playlists, newEntry]);
        setPlaylist('');
        setLoading(false);
    }

    const playListItemTemplate = (playlist: IPlaylist) => {
        return (
            <div className="flex items-center gap-[10px]">
                <div className="flex flex-col">
                    <div className="text-lg">{playlist.name}</div>
                    <div className="text-sm text-gray-500">{playlist.tracks} tracks</div>
                </div>
                <button className="btn btn-square btn-outline btn-sm text-red-400" onClick={() => onChange(playlists.filter(p => p.id !== playlist.id))}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-w-[500px] items-center">
            <div className="gap-[10px] flex flex-col items-center justify-center">
                <h1 className="text-3xl">Enter your playlists</h1>
            </div>
            <div className="divider divider"></div>
            <div className="flex gap-[10px] items-center">
                <input
                    type="text"
                    placeholder="Playlist URL"
                    className="input input-bordered input-md w-full max-w-xs min-w-[400px]"
                    disabled={playlists.length >= 2}
                    value={playlist}
                    onChange={e => setPlaylist(e.target.value)}
                />
                <button disabled={playlists.length >= 2 || loading} className="btn" onClick={sanitizedPlaylists}>
                    {loading ? <span className="loading loading-spinner"></span> : 'Add'}
                </button>
            </div>
            {playlists.length > 0 && <>
                <div className="divider divider"></div>
                {playlists.map(playlist => playListItemTemplate(playlist))}
            </>}
        </div>
    )
}

export default PlaylistPicker;