import Image from "next/image";
import { FC, MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Speaker: FC<Props> = ({ onClick }) => {
  return (
    <button
      className="relative w-9 h-9 border border-gray-300 rounded-md"
      onClick={onClick}
    >
      <Image src="speaker.svg" alt="Speaker" fill className="p-0.5" />
    </button>
  );
};

export default Speaker;
