export interface User {
    display_name: string;
    country: string;
    product: string;
    images: Image[];
}

interface Image {
    url: string;
    height: number;
    width: number;
}

const useAuth = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user ?? '{}') as User;
}

export default useAuth;