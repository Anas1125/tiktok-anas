import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { CommentWithProfile } from "../types";
import useGetCommentsByPostId from "../hooks/useGetCommentsByPostId";

interface CommentStore{
    commentsByPost: CommentWithProfile[]
    setCommentByPost: (postId: string) => void
}
    
export const useCommentStore = create<CommentStore>()(
    devtools(
        persist(
            (set) => ({
                commentsByPost: [],

                setCommentByPost: async (postId: string) => {
                    const result = await useGetCommentsByPostId(postId)
                    set({ commentsByPost: result });
                }
            }),
        {
            name: 'store',
            storage: createJSONStorage(() => localStorage)
        }
        )
    )
)