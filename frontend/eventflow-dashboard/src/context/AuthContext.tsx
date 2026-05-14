import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { jwtDecode } from "jwt-decode";

import { authApi } from "@/services/api";


export type Role =
  | "admin"
  | "organizer"
  | "participant";


export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}


interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<User>;

  register: (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => Promise<User>;

  logout: () => void;

  setUser: (u: User | null) => void;
}


const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );


export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const storedToken =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (storedToken && storedUser) {

      try {

        jwtDecode(storedToken);

        setToken(storedToken);

        setUser(JSON.parse(storedUser));

      } catch {

        localStorage.removeItem("token");

        localStorage.removeItem("user");
      }
    }

    setLoading(false);

  }, []);


  const persist = (
    userData: User,
    jwtToken: string
  ) => {

    localStorage.setItem(
      "token",
      jwtToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(jwtToken);

    setUser(userData);
  };


  // LOGIN
  const login = async (
    email: string,
    password: string
  ) => {

    try {

      const res =
        await authApi.login({
          email,
          password,
        });

      persist(
        res.data.user,
        res.data.token
      );

      return res.data.user;

    } catch (error: any) {

      throw new Error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };


  // REGISTER
  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => {

    try {

      const res =
        await authApi.register(data);

      persist(
        res.data.user,
        res.data.token
      );

      return res.data.user;

    } catch (error: any) {

      throw new Error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
}