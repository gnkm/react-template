import { create } from "zustand";

type DemoCounterState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useDemoCounterStore = create<DemoCounterState>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  reset: () => {
    set({ count: 0 });
  },
}));
