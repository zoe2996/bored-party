"use client";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-4 place-items-center m-5">
        <h1 className="font-sans text-8xl font-bold">Bored Party 🥱🎉</h1>

        <h1 className="font-sans text-4xl font-bold">Games</h1>
        <div className="grid grid-cols-2 w-full gap-4">
          <GamePanel text="Taboo" link="/taboo" addedClass="bg-purple-600" />
          <GamePanel
            text="Netflix: The Game"
            link="/netflix"
            addedClass="bg-red-600"
          />
        </div>
      </div>
    </main>
  );
}

interface GamePanelHeader {
  addedClass?: string;
  text: string;
  link: string;
}
function GamePanel({ addedClass, text, link }: GamePanelHeader) {
  const router = useRouter();
  return (
    <>
      <button
        className={
          `col-auto p-20 rounded-xl font-sans font-bold text-xl ${addedClass} hover:bg-white hover:text-black`
        }
        onClick={() => {
          router.push(link);
        }}
      >
        {text}
      </button>
    </>
  );
}
