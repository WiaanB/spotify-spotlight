import React from 'react';

interface IPlaylistPickerProps {
    playlists: string[];
    onChange: (playlists: string[]) => void;
}

const PlaylistPicker: React.FC<IPlaylistPickerProps> = ({ playlists, onChange }) => {
    const [playlist, setPlaylist] = React.useState<string>('');

    const sanitizedPlaylists = () => {
        onChange([...playlists, playlist]);
        setPlaylist('');
    }

    return (
        <div className="flex min-h-[100px]">
            <div className="gap-[10px] flex flex-col items-center justify-center">
                <h1 className="text-3xl">Enter your playlists</h1>
                {playlists.length > 0 && (
                    <>
                        <div className={`badge badge-outline badge-sm text-${playlists.length === 2 ? 'red' : 'green'}-400`}>{playlists.length} selected</div>
                        <button className="btn-xs text-red-400" onClick={() => onChange([])}>Clear</button>
                    </>
                )}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex gap-[10px] items-center">
                <input
                    type="text"
                    placeholder="Playlist URL"
                    className="input input-bordered input-md w-full max-w-xs"
                    disabled={playlists.length >= 2}
                    value={playlist}
                    onChange={e => setPlaylist(e.target.value)}
                />
                <button disabled={playlists.length >= 2} className="btn" onClick={sanitizedPlaylists}>Add</button>
            </div>
        </div>
    )
}

export default PlaylistPicker;