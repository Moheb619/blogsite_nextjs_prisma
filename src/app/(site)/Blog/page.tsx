"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Blog = () => {
  const [newPost, setNewPost] = useState([]);
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`/api/blog`);
      setNewPost(res.data.blogs);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <div className="py-20 px-10 space-y-8">
      <h1 className="text-5xl font-bold text-center">Blogs</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {/* Post Start */}
        {newPost.map((post: any) => (
          <div key={post.id} className="card card-compact w-60 bg-base-100 shadow-xl m-5">
            <div className="card-body">
              <h2 className="card-title text-center">{post.title}</h2>
              <p className="text-center">{post.des}</p>
            </div>
          </div>
        ))}
        {/* Post End */}
      </div>
    </div>
  );
};

export default Blog;
