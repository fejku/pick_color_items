import { FC, useState } from "react";
import Image from "next/image";

import classes from "./Item.module.css";

type Props = {
  item: IItem;
  isCorrect: boolean;
  isClicked: boolean;
  onClick: () => void;
};

const Item: FC<Props> = ({ item, isCorrect, isClicked, onClick }) => {
  const onItemClick = () => {
    onClick();
  };

  return (
    <div className={`w-1/4`}>
      <button
        className={`${classes.itemButton} relative w-full border hover:border-2 border-gray-300 rounded-lg hover:bg-gray-50`}
        onClick={onItemClick}
      >
        <img
          src={`/game/${item.file}.svg`}
          alt={`${item.en.color} ${item.en.name}`}
          className={"absolute w-full h-full p-5"}
        />
        {isClicked && (
          <img
            src={isCorrect ? "ok.svg" : "cross.svg"}
            alt={isCorrect ? "OK" : "Red cross"}
            className={"absolute w-full h-full p-5"}
          />
        )}
      </button>
    </div>
  );
};

export default Item;
