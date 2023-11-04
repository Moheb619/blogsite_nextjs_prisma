"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const Service = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://agency.teamrabbil.com/api/AllService`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="py-20 px-10 space-y-8">
      <div className="space-y-8">
        <h1 className="text-5xl font-bold text-center">SERVICES</h1>
      </div>
      <div className="space-y-2">
        <div className="flex pt-20 justify-center flex-wrap gap-8">
          {data.slice(0, 4).map((item: any, index: number) => (
            <div key={index} className="flex shadow-xl rounded-lg p-3 flex-col space-y-4 items-center pt-10">
              <p className="text-xl font-bold">{item.title}</p>
              <p className="break-words w-[450px] text-start">{item.des}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
