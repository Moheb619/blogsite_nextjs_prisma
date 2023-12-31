"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const initialBlogs = [
  { title: "Introduction to Next.js", des: "Learn the basics of Next.js and why it's so popular." },
  { title: "Using TailwindCSS with React", des: "How to effectively use TailwindCSS in your React projects." },
];

export default function Dashboard() {
  const fetchService = async () => {
    try {
      const res = await axios.get("/api/service");
      setServices(res.data.services);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  const fetchBlog = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/moreuser");
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchContact = async () => {
    try {
      const res = await axios.get("/api/contact");
      setContacts(res.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  useEffect(() => {
    fetchService();
    fetchBlog();
    fetchUser();
    fetchContact();
  }, []);
  const [services, setServices] = useState<any>([]);
  const [blogs, setBlogs] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [newServiceTitle, setNewServiceTitle] = useState<any>("");
  const [newServiceDescription, setNewServiceDescription] = useState<any>("");
  const [newBlogTitle, setNewBlogTitle] = useState<any>("");
  const [newBlogDescription, setNewBlogDescription] = useState<any>("");

  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editingBlogIndex, setEditingBlogIndex] = useState<number | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");

  const addService = () => {
    const newService = {
      title: newServiceTitle,
      des: newServiceDescription,
    };
    try {
      const res = axios.post("api/service", newService, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Service Added Successfully");
    } catch (error: any) {
      alert("Form Invalid");
    }
    setServices([...services, newService]);
    setNewServiceTitle("");
    setNewServiceDescription("");
  };

  const addBlog = () => {
    const newBlog = {
      title: newBlogTitle,
      des: newBlogDescription,
    };
    const res = axios.post("api/blog", newBlog, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Blog Added Successfully");
    setBlogs([...blogs, newBlog]);
    setNewBlogTitle("");
    setNewBlogDescription("");
  };

  const deleteService = (index: number, id: string) => {
    const updatedServices = [...services];
    const res = axios.delete(`api/service/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const deleteBlog = (index: number, id: string) => {
    const updatedBlogs = [...blogs];
    const res = axios.delete(`api/blog/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    updatedBlogs.splice(index, 1);
    setBlogs(updatedBlogs);
  };

  const updateService = (index: number, title: string, des: string, id: string) => {
    const updatedServices = [...services];
    const res = axios.put(
      `api/service/${id}`,
      { title, des },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    updatedServices[index] = { title, des };
    setServices(updatedServices);
  };

  const updateBlog = (index: number, title: string, des: string, id: string) => {
    const updatedBlogs = [...blogs];
    const res = axios.put(
      `api/blog/${id}`,
      { title, des },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    updatedBlogs[index] = { title, des };
    setBlogs(updatedBlogs);
  };

  const startEditingService = (index: number, id: string) => {
    setTempTitle(services[index].title);
    setTempDescription(services[index].des);
    setEditingServiceIndex(index);
    setEditingServiceId(id);
  };

  const startEditingBlog = (index: number, id: string) => {
    setTempTitle(blogs[index].title);
    setTempDescription(blogs[index].des);
    setEditingBlogIndex(index);
    setEditingBlogId(id);
  };

  const saveEditingService = (index: number, id: string) => {
    console.log(id);
    updateService(index, tempTitle, tempDescription, id);
    setEditingServiceIndex(null);
    setEditingServiceId;
  };

  const saveEditingBlog = (index: number, id: string) => {
    updateBlog(index, tempTitle, tempDescription, id);
    setEditingBlogIndex(null);
  };

  return (
    <div className="p-4">
      {/* Users */}
      <section id="dashboardUserSection" className="my-10">
        <h2 className="font-bold text-center text-2xl">Users</h2>
        {users.map((user: any, index: number) => (
          <div key={index} className="border p-2 rounded mb-2">
            <>
              <h3>{index + 1}</h3>
              <h3>{user.fullname}</h3>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </>
          </div>
        ))}
      </section>

      {/* Contact Messages */}
      <section id="dashboardContactSection" className="my-10">
        <h2 className="font-bold text-center text-2xl">Contact Messages</h2>
        {contacts.map((contact: any, index: number) => (
          <div key={index} className="border p-2 rounded mb-2">
            <>
              <h3>{index + 1}</h3>
              <h3>{contact.fullname}</h3>
              <p>{contact.email}</p>
              <p>{contact.message}</p>
            </>
          </div>
        ))}
      </section>

      {/* Services */}
      <section id="dashboardServiceSection" className="my-10">
        <h2 className="font-bold text-center text-2xl">Services</h2>
        <div>
          <input value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} placeholder="Service Title" className="border rounded p-2 mr-2" />
          <input value={newServiceDescription} onChange={(e) => setNewServiceDescription(e.target.value)} placeholder="Service Description" className="border rounded p-2" />
          <button onClick={addService} className="ml-2 p-2 bg-green-500 text-white rounded">
            Add Service
          </button>
        </div>
        {services.map((service: any, index: number) => (
          <div key={index} className="border p-2 rounded mb-2">
            {editingServiceIndex === index ? (
              <>
                <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} placeholder="Service Title" className="border rounded p-2 mr-2" />
                <input value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} placeholder="Service Description" className="border rounded p-2" />
                <button onClick={() => saveEditingService(index, service.id)} className="ml-2 p-2 bg-green-500 text-white rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{index + 1}</h3>
                <h3>{service.title}</h3>
                <p>{service.des}</p>
                <button onClick={() => startEditingService(index, service.id)} className="p-1 bg-yellow-500 text-white rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteService(index, service.id)} className="p-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </section>
      {/* Blog */}
      <section id="dashboardBlogSection" className="my-10">
        <h2 className="font-bold text-center text-2xl">Blogs</h2>
        <div>
          <input value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} placeholder="Blog Title" className="border rounded p-2 mr-2" />
          <input value={newBlogDescription} onChange={(e) => setNewBlogDescription(e.target.value)} placeholder="Blog Description" className="border rounded p-2" />
          <button onClick={addBlog} className="ml-2 p-2 bg-green-500 text-white rounded">
            Add Blog
          </button>
        </div>
        {blogs.map((blog: any, index: number) => (
          <div key={index} className="border p-2 rounded mb-2">
            {editingBlogIndex === index ? (
              <>
                <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} placeholder="Blog Title" className="border rounded p-2 mr-2" />
                <input value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} placeholder="Blog Description" className="border rounded p-2 mr-2" />
                <button onClick={() => saveEditingBlog(index, blog.id)} className="ml-2 p-2 bg-green-500 text-white rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{index + 1}</h3>
                <h3>{blog.title}</h3>
                <p>{blog.des}</p>
                <button onClick={() => startEditingBlog(index, blog.id)} className="p-1 bg-yellow-500 text-white rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteBlog(index, blog.id)} className="p-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
