import React from "react";
import css from "./index.module.css";

type PetCardProps = {
  name: string;
  place: string;
  imageUrl: string;
  buttonLabel: string;
  buttonColor?: "blue" | "red";
  onButtonClick: () => void;
};

export function PetCard({ name, place, imageUrl, buttonLabel, buttonColor = "red", onButtonClick }: PetCardProps) {
  return (
    <article className={css.root}>
      <img className={css.image} src={imageUrl} alt={name} />
      <div className={css.info}>
        <div>
          <h3 className={css.name}>{name}</h3>
          <p className={css.place}>{place}</p>
        </div>
        <button className={`${css.button} ${css[buttonColor]}`} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}