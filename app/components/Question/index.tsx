import React, { FC } from "react";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
	text: string;
};

export const Question: FC<Props> = ({ text }) => {
	const seperateByLine = text.split(",");

	return (
		<h1 className="question">
			{seperateByLine.map((line) => (
				<div className="text-container">
					<span className="background">{line}</span>
				</div>
			))}
		</h1>
	);
};
