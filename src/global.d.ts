export {}

declare global {
    interface ImportMeta {
      env: {
        VITE_SPOTIFY_CLIENT_ID: string;
        VITE_REDIRECT_TARGET: string;
      }
    }
  }