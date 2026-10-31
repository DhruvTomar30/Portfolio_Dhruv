"use client";

import { create } from "zustand";
import { AUTH_TOKEN_KEY } from "@/lib/apiReq";
import type { AuthUser } from "@/types/api";

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	status: "idle" | "checking" | "authenticated" | "anonymous";
	setSession: (token: string, user: AuthUser) => void;
	setUser: (user: AuthUser) => void;
	setStatus: (status: AuthState["status"]) => void;
	logout: () => void;
	readToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	status: "idle",
	setSession: (token, user) => {
		window.localStorage.setItem(AUTH_TOKEN_KEY, token);
		set({ token, user, status: "authenticated" });
	},
	setUser: (user) => set({ user, status: "authenticated" }),
	setStatus: (status) => set({ status }),
	logout: () => {
		window.localStorage.removeItem(AUTH_TOKEN_KEY);
		set({ token: null, user: null, status: "anonymous" });
	},
	readToken: () => (typeof window === "undefined" ? null : window.localStorage.getItem(AUTH_TOKEN_KEY)),
}));
