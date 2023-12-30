import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../hooks/useSpotify';
import { get } from 'lodash';

import { PlaylistedTrack } from '@spotify/web-api-ts-sdk'

import { IPlaylist, ICompareOptions } from './types';
import PopularArtistChart from '../../components/PopularChart';
interface IResultViewProps {
    playlists: IPlaylist[];
    options: ICompareOptions;
}

interface ArtistCount {
    [key: string]: number;
}

interface IResult {
    title: string;
    followers: number;
    total_tracks: number;
    most_popular_artists: ArtistCount; // use the keys to derive the unique artist count
    playlist_duration: number;
}

const ResultView: React.FC<IResultViewProps> = ({ playlists }) => {
    const [results, setResults] = useState<IResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState<IResult[]>([]);
    const sdk = useSpotify();

    useEffect(() => {
        async function getPlaylist(id: string) {
            if (!sdk) return;
            const playlist = await sdk.playlists.getPlaylist(id);
            const playlist_items = await sdk.playlists.getPlaylistItems(id);
            const result: IResult = {
                title: playlist.name,
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
            setResults((r: IResult[]) => [...r, result]);
        }
        playlists.forEach(playlist => getPlaylist(playlist.id));
    }, [sdk])

    useEffect(() => {
        if (results.length === 2) {
            setLoading(false);
            setSelectedPlaylist([results[1]]);
        }
    }, [results])

    const displayTemplate = (title: string, value: number, tagline: string) => (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">{title}</div>
                <div className="stat-value">{value}</div>
                <div className="stat-desc">{tagline}</div>
            </div>
        </div>
    )

    return (<>
        {loading ? <div>Loading...</div> : <div className="min-w-[800px] grid grid-cols-3 text-center">
            <div className="flex flex-col">
                <h1>Followers:</h1>
                <div className="flex">
                    {selectedPlaylist.map((playlist: IResult) => displayTemplate(playlist.title, playlist.followers, "total followers"))}
                </div>
            </div>
            <div className="flex flex-col">
                <h1>Total Tracks:</h1>
                <div className="flex">
                    {selectedPlaylist.map((playlist: IResult) => displayTemplate(playlist.title, playlist.total_tracks, "total tracks"))}
                </div>
            </div>
            <div className="flex flex-col">
                <h1>Unique artists:</h1>
                <div className="flex">
                    {selectedPlaylist.map((playlist: IResult) => displayTemplate(playlist.title, Object.keys(playlist.most_popular_artists).length, "unique artists features"))}
                </div>
            </div>
            <div className="flex flex-col">
                <h1>Most Popular Artists:</h1>
                <div className="flex">
                    {selectedPlaylist.map((playlist: IResult) => <PopularArtistChart data={playlist.most_popular_artists} />)}
                </div>
            </div>
            <div className="flex flex-col">
                <h1>Duration:</h1>
                <div className="flex">
                    {selectedPlaylist.map((playlist: IResult) => displayTemplate(playlist.title, playlist.playlist_duration, "total playtime"))}
                </div>
            </div>
        </div>}
    </>
    )
}

export default ResultView;