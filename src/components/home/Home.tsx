"use client";
import axios from "axios";
import styles from "./Home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const HomeComponent = () => {
  const [newPartners, setNewPartners] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`https://basic-blog.teamrabbil.com/api/post-newest`);
      setNewPost(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  const fetchPartners = async () => {
    try {
      const res = await axios.get(`https://agency.teamrabbil.com/api/BrandList`);
      setNewPartners(res.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 8));
    fetchContacts();
    fetchPartners();
  }, []);
  return (
    <>
      <section
        id="homeBanner"
        className="hero h-[90vh] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(https://img.freepik.com/premium-photo/office-dark-leather-table-with-laptop-red-note-book-coffee-copy-space_67155-1849.jpg?w=900)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold capitalize">Welcome to My blog website</h1>
            <Link className="btn btn-info" href="/Blog">
              Go To Blog Page
            </Link>
          </div>
        </div>
      </section>
      <section id="homeBlog">
        <div className={`${styles.blog_container}`}>
          <h1 className={`${styles.blog_heading}`}>Blogs</h1>
          <div className="flex flex-row flex-wrap justify-center">
            {/* Post Start */}
            {newPost.slice(randomNumber, randomNumber + 3).map((post: any) => (
              <div key={post.id} className="card card-compact w-60 bg-base-100 shadow-xl m-5">
                <Link href={`Post/${post.id}`}>
                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p>{post.short}</p>
                  </div>
                </Link>
              </div>
            ))}
            {/* Post End */}
          </div>
        </div>
        <Link href={"Blog"}>
          <p className="text-center mb-5 hover:text-blue-500 -mt-10">See More Blogs -&gt;</p>
        </Link>
      </section>
      <section>
        <div className="bg-[#F8FFF9] h-[120px] flex justify-evenly px-10 items-center">
          {/* <img src="Our Partners.jpg" alt="" /> */}
          {newPartners.map((item: any, index: number) => (
            <img key={index} className="p-2 w-[10rem] h-[3.5rem]" alt="" src={item.image} />
          ))}
        </div>
      </section>
      <section id="homeBlogDescription" className="footer p-4 md:p-10 bg-base-200 text-base-content flex flex-col md:flex-row justify-between bg-gray-900 text-white">
        <div className="w-full md:w-2/3">
          <p className="text-xl md:text-4xl text-green-900 font-bold" style={{ textShadow: "1px 1px black" }}>
            BLOG WEBSITE
          </p>
          <p className="w-full md:w-[90%] mt-4 md:mt-0">
            Welcome to our diverse and captivating blog website! Here, you&apos;ll find a rich collection of content spanning various topics that cater to your interests and curiosities. From
            &quot;লাইব্রেরি&quot; (Library) to &quot;উপকথা&quot; (Folklore), our blog covers an array of subjects including history, sports, Bangladesh, global affairs, books and cinema, science,
            biographies, lifestyle, and intriguing tales. Our carefully curated posts provide insightful and engaging information, making this platform your go-to source for expanding your knowledge
            and enjoying a diverse range of content. Join us on this journey of exploration and discovery!
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0">
          <p className="text-lg md:text-2xl underline underline-offset-8">Contact</p>
          <p>
            Saeed Hossain Moheb <br />
            Studying Bsc in Information and Communication Engineering,Bangladesh University of Professionals <br />
            Mobile: 01571361404 <br />
            Email: 6moheb19@gmail.com
          </p>
        </div>
      </section>
    </>
  );
};

export default HomeComponent;
