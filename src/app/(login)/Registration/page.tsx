"use client";
import Image from "next/image";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

// Form input value's types
type Inputs = {
  fullname: string;
  email: string;
  phone: string;
};

const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      const res = axios.post("api/moreuser", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      reset();
      alert("User Registered Successfully");
    } catch (error: any) {
      alert("Form Invalid");
    }
  };
  return (
    <section id="contact" className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32  text-black">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leadi lg:text-5xl">Register User</h2>
        </div>
        <Link href={"/"}>
          <div className="hover:text-red-500">Go To Home Page</div>
        </Link>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Full Name</label>
          <input type="fullname" id="fullname" className="w-full p-3 rounded bg-gray-200" {...register("fullname", { required: "Fullname is required" })}></input>
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
          <label className="text-sm">Phone</label>
          <input id="password" className="w-full p-3 rounded bg-gray-200" {...register("phone", { required: "Phone is required" })}></input>
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone?.message}</p>}
        </div>
        <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-black text-white">
          Register
        </button>
      </form>
    </section>
  );
};

export default Registration;
