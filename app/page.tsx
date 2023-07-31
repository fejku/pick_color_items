"use client";

import { useEffect, useState } from "react";

import Lang from "@/components/Lang";
import Item from "@/components/Item";

import items from "./items.json";

export default function Home() {
  const [language, setLanguage] = useState("en");

  const [pickedItem, setPickedItem] = useState<null | number>(null);
  const [drawnItems, setDrawnItems] = useState<IItem[]>([]);
  const [clicked, setClicked] = useState<number[]>([]);

  useEffect(() => {
    newGame();
  }, []);

  const onLangChangeClick = () => {
    setLanguage((v) => (v === "pl" ? "en" : "pl"));
  };

  const getFindText = (drawnItems: IItem[], pickedIndex: null | number) => {
    if (pickedIndex === null) return "";

    if (language === "pl") {
      return `Znajdź ${drawnItems[pickedIndex].pl.color} ${drawnItems[pickedIndex].pl.name}`;
    }
    return `Find the ${drawnItems[pickedIndex].en.color} ${drawnItems[pickedIndex].en.name}`;
  };

  const newGame = () => {
    setClicked([]);
    // Wylosuj indeks wybranego przedmiotu
    const newPickedIndex = Math.floor(Math.random() * 3);
    setPickedItem(newPickedIndex);

    const newDrawnIndexes: number[] = [];
    for (let i = 0; i < 3; i++) {
      let drawnIndex;

      do {
        drawnIndex = Math.floor(Math.random() * items.length);
      } while (newDrawnIndexes.includes(drawnIndex));
      newDrawnIndexes.push(drawnIndex);
    }
    const newDrawnItems = newDrawnIndexes.map((itemIndex, i) => ({
      ...items[itemIndex],
      isCorrect: newPickedIndex === i,
      isClicked: false,
    }));
    setDrawnItems(newDrawnItems);

    const speech = new SpeechSynthesisUtterance();
    speech.lang = language;
    speech.text = getFindText(newDrawnItems, newPickedIndex);
    speech.rate = 0.75; // Prędkość mówienia
    // speech.pitch = 2;

    window.speechSynthesis.speak(speech);
  };

  const onItemClick = (i: number) => {
    if (!clicked.includes(i)) {
      setClicked([...clicked, i]);
    }
    if (pickedItem === i) {
      setTimeout(() => {
        newGame();
      }, 500);
    }
  };

  return (
    <main className="w-full h-screen">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-5 h-24 relative">
          <p className="flex-1 text-center text-lg">
            {getFindText(drawnItems, pickedItem)}
          </p>
          <Lang language={language} onClick={onLangChangeClick} />
        </div>
        <div className="flex flex-1 justify-evenly">
          {drawnItems.map((item, i) => (
            <Item
              key={item.file}
              item={item}
              isCorrect={pickedItem === i}
              isClicked={clicked.includes(i)}
              onClick={onItemClick.bind(null, i)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
