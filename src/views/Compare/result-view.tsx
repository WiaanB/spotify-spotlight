import React, { useEffect } from 'react';
import { useSpotify } from '../../hooks/useSpotify';

import { PlaylistedTrack } from '@spotify/web-api-ts-sdk'

import { IPlaylist, ICompareOptions } from './types';
import { get } from 'lodash';
interface IResultViewProps {
    playlists: IPlaylist[];
    options: ICompareOptions;
}

interface ArtistCount {
    [key: string]: number;
}

interface IResult {
    followers: number;
    total_tracks: number;
    most_popular_artists: ArtistCount; // use the keys to derive the unique artist count
    playlist_duration: number;
}

const ResultView: React.FC<IResultViewProps> = ({ playlists, options }) => {

    const sdk = useSpotify();

    useEffect(() => {
        async function getPlaylist(id: string) {
            if (!sdk) return;
            const playlist = await sdk.playlists.getPlaylist(id);
            const playlist_items = await sdk.playlists.getPlaylistItems(id);
            const result: IResult = {
                followers: get(playlist, 'followers.total', 0),
                total_tracks: playlist_items.items.length,
                playlist_duration: 0,
                most_popular_artists: {}
            }
            playlist_items.items.forEach((item: PlaylistedTrack) => {
                // increase duration
                result.playlist_duration += item.track.duration_ms;
                // increase artist count
                const artist: string = get(item, 'track.artists[0].name', '');
                if (result.most_popular_artists[artist]) {
                    result.most_popular_artists[artist] += 1;
                } else {
                    result.most_popular_artists[artist] = 1;
                }
            })
            console.log({result});
        }
        playlists.forEach(playlist => getPlaylist(playlist.id));
    }, [sdk])

    return (
        <div>
            <h1>ResultView</h1>
        </div>
    )
}

export default ResultView;