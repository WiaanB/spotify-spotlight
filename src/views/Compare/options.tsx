import React, { useEffect } from 'react';

import { ICompareOptions } from './types';
interface IOptionsProps {
    options: ICompareOptions
    onChange: (options: ICompareOptions) => void
}

const Options: React.FC<IOptionsProps> = ({ options, onChange }) => {
    const [followers, setFollowers] = React.useState<boolean>(options.followers);
    const [total_tracks, setTotalTracks] = React.useState<boolean>(options.total_tracks);
    const [unique_artists, setUniqueArtists] = React.useState<boolean>(options.unique_artists);
    const [most_popular_artist, setMostPopularArtist] = React.useState<boolean>(options.most_popular_artist);
    const [total_playback_duration, setTotalPlaybackDuration] = React.useState<boolean>(options.total_playback_duration);

    useEffect(() => {
        onChange({
            followers,
            total_tracks,
            unique_artists,
            most_popular_artist,
            total_playback_duration
        })
    }, [followers, total_tracks, unique_artists, most_popular_artist, total_playback_duration]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl">Set Options to display:</h1>
            <div className="form-control min-w-[400px]">
                <label className="label cursor-pointer">
                    <span className="label-text">Show Followers</span>
                    <input
                        type="checkbox"
                        checked={followers}
                        className="checkbox checkbox-primary"
                        onChange={() => setFollowers(!followers)}
                    />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text">Show Track Totals</span>
                    <input
                        type="checkbox"
                        checked={total_tracks}
                        className="checkbox checkbox-primary"
                        onChange={() => setTotalTracks(!total_tracks)}
                    />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text">Show Unique Artist Count</span>
                    <input
                        type="checkbox"
                        checked={unique_artists}
                        className="checkbox checkbox-primary"
                        onChange={() => setUniqueArtists(!unique_artists)}
                    />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text">Show Most Popular Artists</span>
                    <input
                        type="checkbox"
                        checked={most_popular_artist}
                        className="checkbox checkbox-primary"
                        onChange={() => setMostPopularArtist(!most_popular_artist)}
                    />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text">Show Total Duration</span>
                    <input
                        type="checkbox"
                        checked={total_playback_duration}
                        className="checkbox checkbox-primary"
                        onChange={() => setTotalPlaybackDuration(!total_playback_duration)}
                    />
                </label>
            </div>
        </div>
    )
}

export default Options;