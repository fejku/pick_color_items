import { FC, MouseEventHandler } from "react";

type Props = {
  language: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Lang: FC<Props> = ({ language, onClick }) => {
  return (
    <button
      className="py-1 px-2.5 rounded-md border border-gray-300"
      onClick={onClick}
    >
      {language === "pl" ? "Lang: en" : "Język: pl"}
    </button>
  );
};

export default Lang;
