import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import useGetProfileByUserId from "../hooks/useGetProfileByUserId";
import { Profile } from "../types";


interface profile{
    currentProfile: Profile | null;
    setCurrentProfile: (userId: string) => void;
}

export const useprofileStore = create<profile>()(
    devtools(
        persist(
            (set) => ({
                currentProfile: null,
                
                setCurrentProfile: async (userId: string) => {
                    const result = await useGetProfileByUserId(userId)
                    set({ currentProfile: result })
            }
        }),
        {
            name: 'store',
            storage: createJSONStorage(() => localStorage)
        }
        )
    )
)