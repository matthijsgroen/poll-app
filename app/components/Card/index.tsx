import React, { FC } from "react";
import { PollCategory } from "~/utils/polls";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type CardProps = {
	title: JSX.Element | JSX.Element[];
	category: PollCategory;
};
export const Card: FC<CardProps> = ({ title, category, children }) => (
	<article className={`card ${category}`}>
		<h3 className="title">{title}</h3>
		{children}
	</article>
);
