"use client"

import MainLayout from "./layouts/MainLayout";
import ClientOnly from "./Components/ClientOnly";
import PostMain from "./Components/PostMain";
import { usePostStore } from "./stores/post";
import { useEffect } from "react";

export default function Home() {
  let { allPosts, setAllPosts } = usePostStore()
  useEffect(() => { setAllPosts()}, [])
  return (
    <>
       <MainLayout>
        <div className="mt-8 w-[calc(100%-90px)] max-w-[690px] ml-auto">
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index}/>
            ))}
          </ClientOnly>
        </div>
       </MainLayout>
    </>
  );
}
