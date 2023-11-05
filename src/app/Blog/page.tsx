"use client";
import axios from "axios";
import styles from "./Blog.module.css";
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
    <div className={`${styles.blog_container}`}>
      <h1 className={`${styles.blog_heading}`}>Blogs</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {/* Post Start */}
        {newPost.map((post: any) => (
          <div key={post.id} className="card card-compact w-60 bg-base-100 shadow-xl m-5">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.des}</p>
            </div>
          </div>
        ))}
        {/* Post End */}
      </div>
    </div>
  );
};

export default Blog;
