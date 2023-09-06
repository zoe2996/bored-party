"use client";

import { useEffect } from "react";
import { NetflixPage } from "./components/main";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  
  useEffect(() => {
   
  }, []);
  return <NetflixPage></NetflixPage>;
}
