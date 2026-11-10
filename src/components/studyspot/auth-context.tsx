"use client";

import * as React from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (
    name: string,
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

const USERS_KEY = "studyspot_users";
const SESSION_KEY = "studyspot_session";

const DEMO_USER: StoredUser = {
  id: "demo-user",
  name: "Demo Student",
  email: "demo@studyspot.app",
  password: "demo1234",
};

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [DEMO_USER];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    const list: StoredUser[] = raw ? JSON.parse(raw) : [];
    const hasDemo = list.some((u) => u.email === DEMO_USER.email);
    return hasDemo ? list : [DEMO_USER, ...list];
  } catch {
    return [DEMO_USER];
  }
}

function writeUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

function writeSession(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) window.localStorage.setItem(SESSION_KEY, id);
  else window.localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const id = readSession();
    if (id) {
      const found = readUsers().find((u) => u.id === id);
      if (found) {
        const { password, ...rest } = found;
        void password;
        setUser(rest);
      }
    }
    setReady(true);
  }, []);

  const signIn = React.useCallback((email: string, password: string) => {
    const e = email.trim().toLowerCase();
    if (!e || !password) return { ok: false, error: "Please fill in all fields." };
    const users = readUsers();
    const found = users.find((u) => u.email.toLowerCase() === e);
    if (!found) return { ok: false, error: "No account found with that email." };
    if (found.password !== password)
      return { ok: false, error: "Incorrect password. Please try again." };
    writeSession(found.id);
    const { password: _, ...rest } = found;
    void _;
    setUser(rest);
    return { ok: true };
  }, []);

  const signUp = React.useCallback(
    (name: string, email: string, password: string) => {
      const n = name.trim();
      const e = email.trim().toLowerCase();
      if (!n || !e || !password)
        return { ok: false, error: "Please fill in all fields." };
      if (n.length < 2) return { ok: false, error: "Name is too short." };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
        return { ok: false, error: "Please enter a valid email." };
      if (password.length < 6)
        return { ok: false, error: "Password must be at least 6 characters." };
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === e))
        return { ok: false, error: "An account with this email already exists." };
      const newUser: StoredUser = {
        id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: n,
        email: e,
        password,
      };
      writeUsers([...users, newUser]);
      writeSession(newUser.id);
      const { password: _, ...rest } = newUser;
      void _;
      setUser(rest);
      return { ok: true };
    },
    []
  );

  const signOut = React.useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, ready, signIn, signUp, signOut }),
    [user, ready, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
