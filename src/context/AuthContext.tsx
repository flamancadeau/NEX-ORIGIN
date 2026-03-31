import * as React from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const AUTH_KEY = "nex_origin_auth";

/** Hardcoded admin credentials */
const ADMIN_EMAIL = "admin@nexorigin.rw";
const ADMIN_PASSWORD = "admin123";

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
        return localStorage.getItem(AUTH_KEY) === "true";
    });
    const [userEmail, setUserEmail] = React.useState<string | null>(() => {
        return localStorage.getItem(AUTH_KEY + "_email");
    });

    const login = (email: string, password: string): boolean => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setUserEmail(email);
            localStorage.setItem(AUTH_KEY, "true");
            localStorage.setItem(AUTH_KEY + "_email", email);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(AUTH_KEY + "_email");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
