import Image from "next/image";
import { FC, MouseEventHandler } from "react";

type Props = {
  language: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Lang: FC<Props> = ({ language, onClick }) => {
  return (
    <button className="relative w-12 h-12" onClick={onClick}>
      {language === "pl" ? (
        <Image src="us.svg" alt="USA flag" title="Zmień język" fill />
      ) : (
        <Image src="pl.svg" alt="Polish flag" title="Change language" fill />
      )}
    </button>
  );
};

export default Lang;
