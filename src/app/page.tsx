"use client";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 lg:p-24">
      <div className="flex flex-col gap-4 place-items-center m-5">
        <h1 className="font-sans text-4xl lg:text-8xl text-center font-bold">
          Bored Party 🥱🎉
        </h1>
        <div className="text-center mt-5">
          <h1 className="font-sans text-3xl lg:text-4xl font-bold p-4">
            Games
          </h1>
          <div className="grid grid-cols-2 w-full gap-4">
            <GamePanel text="Taboo" link="/taboo" addedClass="bg-purple-600" />
            <GamePanel
              text="Netflix: The Game"
              link="/netflix"
              addedClass="bg-red-600"
            />
            <GamePanel
              text="Impersonator"
              link="/impersonator/live"
              addedClass="bg-green-600"
            />
          </div>
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
        className={`col-auto p-10 rounded-xl font-sans font-bold text-xl ${addedClass} hover:bg-white hover:text-black`}
        onClick={() => {
          router.push(link);
        }}
      >
        {text}
      </button>
    </>
  );
}
