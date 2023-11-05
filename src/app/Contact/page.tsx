"use client";
import Image from "next/image";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

// Form input value's types
type Inputs = {
  fullname: string;
  email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      const res = axios.post("api/contact", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      reset();
      alert("Contact Form Submitted Successfully");
    } catch (error: any) {
      alert("Form Invalid");
    }
  };
  return (
    <section id="contact" className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32  text-black">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leadi lg:text-5xl">Contact Us</h2>
          <div className="dark:text-black">
            <p>
              Saeed Hossain Moheg <br />
              Student of Bangladesh University of Professionals <br />
              Department of ICT <br />
              <br />
              <span className="font-bold">Email:</span> 6moheb19@gmail.com
            </p>
          </div>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Full name</label>
          <input id="full_name" type="text" className="w-full p-3 rounded bg-gray-200" {...register("fullname", { required: "Full Name is required" })} />
          {errors.fullname && <p className="text-red-600 text-sm">{errors.fullname?.message}</p>}
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded bg-gray-200"
            {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Invalid Email" } })}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email?.message}</p>}
        </div>
        <div>
          <label className="text-sm">Message</label>
          <textarea id="message" className="w-full p-3 rounded bg-gray-200" {...register("message", { required: "Message is required" })}></textarea>
          {errors.message && <p className="text-red-600 text-sm">{errors.message?.message}</p>}
        </div>
        <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-black text-white">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
