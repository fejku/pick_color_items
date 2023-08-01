import Image from "next/image";
import { FC, MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Speaker: FC<Props> = ({ onClick }) => {
  return (
    <button
      className="relative w-10 h-10 border border-gray-300 rounded-sm"
      onClick={onClick}
    >
      <Image src="speaker.svg" alt="Speaker" fill />
    </button>
  );
};

export default Speaker;
