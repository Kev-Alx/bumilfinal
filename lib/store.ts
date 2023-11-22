import { create } from "zustand";
import { FireUser } from "../hooks/use-auth";

type SearchStore = {
  activePatient: FireUser | null;
  setActivePatient: (user: FireUser | null) => void;
};

export const useActivePatient = create<SearchStore>((set) => ({
  activePatient: null,
  setActivePatient: (user) => set({ activePatient: user }),
}));

type ProfileLocalStore = {
  height: string;
  age: string;
  setHeight: (height: string) => void;
  setAge: (age: string) => void;
};

export const useLocalProfile = create<ProfileLocalStore>((set) => ({
  height: "0",
  age: "0",
  setHeight: (height) => set({ height: height }),
  setAge: (age) => set({ age: age }),
}));

type ActiveTest = {
  type: string;
  setType: (type: string) => void;
};

export const useActiveTest = create<ActiveTest>((set) => ({
  type: "",
  setType: (height) => set({ type: height }),
}));
