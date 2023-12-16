export interface IPlaylist {
    name: string;
    id: string;
    href: string;
    tracks?: number;
}

export interface ICompareOptions {
    total_tracks: boolean;
    unique_artists: boolean;
    most_popular_artist: boolean;
    total_playback_duration: boolean;
    followers: boolean;
    [key: string]: boolean;
}