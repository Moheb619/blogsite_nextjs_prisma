"use client";
import { useState } from "react";

const initialServices = [
  { title: "Web Development", description: "Full-stack web development services." },
  { title: "Mobile App Development", description: "Native and hybrid mobile application services." },
];

const initialBlogs = [
  { title: "Introduction to Next.js", description: "Learn the basics of Next.js and why it's so popular.", time: new Date().toISOString() },
  { title: "Using TailwindCSS with React", description: "How to effectively use TailwindCSS in your React projects.", time: new Date().toISOString() },
];

export default function Dashboard() {
  const [services, setServices] = useState(initialServices);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDescription, setNewBlogDescription] = useState("");

  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editingBlogIndex, setEditingBlogIndex] = useState<number | null>(null);

  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [tempTime, setTempTime] = useState("");

  const addService = () => {
    const newService = {
      title: newServiceTitle,
      description: newServiceDescription,
    };
    setServices([...services, newService]);
    setNewServiceTitle("");
    setNewServiceDescription("");
  };

  const addBlog = () => {
    const newBlog = {
      title: newBlogTitle,
      description: newBlogDescription,
      time: new Date().toISOString(),
    };
    setBlogs([...blogs, newBlog]);
    setNewBlogTitle("");
    setNewBlogDescription("");
  };

  const deleteService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const deleteBlog = (index: number) => {
    const updatedBlogs = [...blogs];
    updatedBlogs.splice(index, 1);
    setBlogs(updatedBlogs);
  };

  const updateService = (index: number, title: string, description: string) => {
    const updatedServices = [...services];
    updatedServices[index] = { title, description };
    setServices(updatedServices);
  };

  const updateBlog = (index: number, title: string, description: string, time: string) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index] = { title, description, time };
    setBlogs(updatedBlogs);
  };

  const startEditingService = (index: number) => {
    setTempTitle(services[index].title);
    setTempDescription(services[index].description);
    setEditingServiceIndex(index);
  };

  const startEditingBlog = (index: number) => {
    setTempTitle(blogs[index].title);
    setTempDescription(blogs[index].description);
    setTempTime(blogs[index].time);
    setEditingBlogIndex(index);
  };

  const saveEditingService = (index: number) => {
    updateService(index, tempTitle, tempDescription);
    setEditingServiceIndex(null);
  };

  const saveEditingBlog = (index: number) => {
    updateBlog(index, tempTitle, tempDescription, tempTime);
    setEditingBlogIndex(null);
  };

  return (
    <div className="p-4">
      <h2>Services</h2>
      <div>
        <input value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} placeholder="Service Title" className="border rounded p-2 mr-2" />
        <input value={newServiceDescription} onChange={(e) => setNewServiceDescription(e.target.value)} placeholder="Service Description" className="border rounded p-2" />
        <button onClick={addService} className="ml-2 p-2 bg-green-500 text-white rounded">
          Add Service
        </button>
      </div>
      {services.map((service, index) => (
        <div key={index} className="border p-2 rounded mb-2">
          {editingServiceIndex === index ? (
            <>
              <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} placeholder="Service Title" className="border rounded p-2 mr-2" />
              <input value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} placeholder="Service Description" className="border rounded p-2" />
              <button onClick={() => saveEditingService(index)} className="ml-2 p-2 bg-green-500 text-white rounded">
                Save
              </button>
            </>
          ) : (
            <>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button onClick={() => startEditingService(index)} className="p-1 bg-yellow-500 text-white rounded mr-2">
                Edit
              </button>
              <button onClick={() => deleteService(index)} className="p-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </>
          )}
        </div>
      ))}

      <h2>Blogs</h2>
      <div>
        <input value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} placeholder="Blog Title" className="border rounded p-2 mr-2" />
        <input value={newBlogDescription} onChange={(e) => setNewBlogDescription(e.target.value)} placeholder="Blog Description" className="border rounded p-2" />
        <button onClick={addBlog} className="ml-2 p-2 bg-green-500 text-white rounded">
          Add Blog
        </button>
      </div>
      {blogs.map((blog, index) => (
        <div key={index} className="border p-2 rounded mb-2">
          {editingBlogIndex === index ? (
            <>
              <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} placeholder="Blog Title" className="border rounded p-2 mr-2" />
              <input value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} placeholder="Blog Description" className="border rounded p-2 mr-2" />
              <input value={tempTime} onChange={(e) => setTempTime(e.target.value)} placeholder="Blog Time" className="border rounded p-2" />
              <button onClick={() => saveEditingBlog(index)} className="ml-2 p-2 bg-green-500 text-white rounded">
                Save
              </button>
            </>
          ) : (
            <>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <span>{new Date(blog.time).toLocaleDateString()}</span>
              <button onClick={() => startEditingBlog(index)} className="p-1 bg-yellow-500 text-white rounded mr-2">
                Edit
              </button>
              <button onClick={() => deleteBlog(index)} className="p-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
