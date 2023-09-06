"use client";

import { NetflixPage } from "./components/main";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  // useSWR('/api/sheets', fetcher)
  return <NetflixPage></NetflixPage>;
}

