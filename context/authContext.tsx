import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
	user: null,
	login: (user: any) => {},
	logout: () => {},
    updateUser: (user: any) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any>(null);

    const router = useRouter();

    auth().onAuthStateChanged(user => {
        console.log(user ? "Logged in" : "Logged out");

        if (user) {
            setUser(user);
        }
    });

	const login = (user: any) => setUser(user);
	const logout = () => setUser(null);
    const updateUser = (user: any) => setUser(user);

	return (
		<AuthContext.Provider value={{ user, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
