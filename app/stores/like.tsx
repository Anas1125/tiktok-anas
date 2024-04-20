import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { Like} from "../types";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";

interface LikeStore{
    likesByPost: Like[];
    setLikesByPost: (postId: string) => void;
}
    
export const useLikeStore = create<LikeStore>()(
    devtools(
        persist(
            (set) => ({
                likesByPost: [],

                setLikesByPost: async (postId: string) =>{
                    const result = await useGetLikesByPostId(postId)
                    set({ likesByPost: result});
                },

            }),
        {
            name: 'store',
            storage: createJSONStorage(() => localStorage)
        }
        )
    )
)