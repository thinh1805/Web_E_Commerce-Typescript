import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface User {
    id: string;
    avatar: string;
    name: string;
    email:string;
    address:string;
    phone:string;
    level:number;
}
interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void
    user: User | null; // Thêm user vào context
    setUser: (user: User | null) => void;
    loading: boolean; // Thêm trạng thái loading
}
interface AuthProviderProps {
    children?: React.ReactNode; // Khai báo kiểu cho children
}
export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const setToken = (token: string | null) => {
        if (token) {
            localStorage.setItem('token', token);
        }
        else {
            localStorage.removeItem('token')
        }
        setTokenState(token);
    }
    const setUser = (user: User | null) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Lưu user dưới dạng chuỗi JSON
        } else {
            localStorage.removeItem('user');
        }
        setUserState(user);
    }
    const logout = () => {
        setToken(null); // Xóa token khỏi context
        setUser(null);  // Xóa user khỏi context
        localStorage.removeItem('token'); // Xóa token khỏi localStorage
        localStorage.removeItem('user');  // Xóa user khỏi localStorage
        navigate('/login')
    };
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken) {
            setTokenState(storedToken);  // Khôi phục token nếu có
        }
        if (storedUser) {
            setUserState(JSON.parse(storedUser)); // Khôi phục user nếu có
        }
        setLoading(false); // Kết thúc quá trình khôi phục
    }, []);
    return (
        <AuthContext.Provider value={{ token, user, setUser, setToken, logout, loading }}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    )
}