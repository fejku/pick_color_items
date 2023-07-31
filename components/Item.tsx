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
    <div className={`relative w-1/4 hover:bg-gray-50 mb-5 ${classes.item}`}>
      <button className="relative w-full h-full" onClick={onItemClick}>
        <Image
          src={`/game/${item.file}.svg`}
          alt="Blue whale"
          // fill
          width={100}
          height={100}
          layout="responsive"
          priority
          className="border hover:border-2 border-gray-300 rounded-lg p-5"
        />
        {isClicked && (
          <Image
            src={isCorrect ? "ok.svg" : "cross.svg"}
            alt={isCorrect ? "OK" : "Red cross"}
            fill
            priority
            className="border hover:border-2 border-gray-300 rounded-lg p-5"
          />
        )}
      </button>
    </div>
  );
};

export default Item;
