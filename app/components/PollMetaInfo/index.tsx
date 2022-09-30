import { FC } from "react";
import { PollStatus } from "../../utils/polls";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

type Props = {
	info: PollInfo;
};

type PollInfo = {
	status: PollStatus;
	edition: number;
	votes: number;
	pollNumber: number;
};

export const PollMetaInfo: FC<Props> = ({ info }) => (
	<section className="poll-meta-info">
		<p className="edition-container">
			<div>
				<span className="edition-text">poll edition</span>
				<span className="edition"> #{info.edition} </span>
			</div>
			<span className="no">(No. {info.pollNumber})</span>
		</p>
		<span className="dot">•</span>
		<p className="status">
			{info.status === "open"
				? "Open for votes!"
				: "This poll is closed!"}{" "}
		</p>
		<span className="dot">•</span>
		<p className="votes">{info.votes} people voted</p>
		{/* Status: {status} -{" "}
		{status !== "open" ? (
			<span>it is not possible to submit to the poll anymore ⚠️</span>
		) : (
			<span>the poll is open for responses! ✅ </span>
		)} */}
	</section>
);
