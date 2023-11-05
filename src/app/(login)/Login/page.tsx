"use client";
import Image from "next/image";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
// Form input value's types
type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [toastMessage, setToastMessage] = useState<String>("");
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (toastMessage === "Logged in successfully!" && session.status === "authenticated") {
      toast.success(toastMessage + " Redirecting to DASHBOARD");
      setTimeout(function () {
        router.push("/Dashboard");
      }, 1500);
    } else if ((toastMessage === "Invalid Credentials" && session.status === "unauthenticated") || !session.status) {
      toast.error(toastMessage);
    } else if (toastMessage === "" && session.status === "authenticated") {
      router.push("/Login");
    }
  }, [session, router, toastMessage]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setToastMessage("Invalid Credentials");
      }
      if (callback?.ok && !callback?.error) {
        setToastMessage("Logged in successfully!");
      }
    });
  };
  return (
    <section id="contact" className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32  text-black">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leadi lg:text-5xl">Log In To Dashboard</h2>
        </div>
        <div className="space-y-2 my-10">
          <h2 className="text-xl font-bold leadi lg:text-xl">Use This ID PASS to login to Dashboard</h2>
          <p>Email: root@gmail.com</p>
          <p>Password: root</p>
        </div>
        <Link href={"/"}>
          <div className="hover:text-red-500">Go To Home Page</div>
        </Link>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">Email</label>
          <input id="email" type="email" className="w-full p-3 rounded bg-gray-200" {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email?.message}</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input type="password" id="password" className="w-full p-3 rounded bg-gray-200" {...register("password", { required: "Password is required" })}></input>
          {errors.password && <p className="text-red-600 text-sm">{errors.password?.message}</p>}
        </div>
        <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-black text-white">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
