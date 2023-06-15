import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import logoImg from "./assets/Logo.svg";
import "./styles/main.css";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("https://nlw-esports-server-dadc.onrender.com/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {
        console.log("slide changed");
      },
      loop: true,
      drag: true,
      slides: {
        perView: 6,
      }
    },
    [
      // add plugins here
    ]
  );

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo NLW eSports" />

      <h1 className="text-6xl text-white font-black">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        esta aqui.
      </h1>

      <div ref={sliderRef} className="grid grid-cols-6 gap-6 mt-16 keen-slider">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
