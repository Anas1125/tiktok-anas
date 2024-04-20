import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { PostWithProfile, post } from "../types";
import useGetAllPost from "../hooks/useGetAllPost";
import useGetPostByUser from "../hooks/useGetPostByUser";
import useGetPostById from "../hooks/useGetPostById";


interface PostStore{
    allPosts: PostWithProfile[];
    postByUser: post[];
    postById: PostWithProfile | null;
    setAllPosts : () => void;
    setPostByUser : (userId: string) => void;
    setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()(
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                postByUser: [],
                postById: null,
                
                setAllPosts: async () =>{
                    const result = await useGetAllPost()
                    set({ allPosts: result});
                },
                setPostByUser: async (userId: string) => {
                    const result = await useGetPostByUser(userId)
                    set({ postByUser: result});
                },
                setPostById: async (postId: string) =>{
                    const result = await useGetPostById(postId)
                    set({ postById: result}) 
                },
            }),
        {
            name: 'store',
            storage: createJSONStorage(() => localStorage)
        }
        )
    )
)