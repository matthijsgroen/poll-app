import classNames from "classnames";
import React, { FC, Fragment, useState } from "react";
import { PollData } from "~/utils/polls";
import { Block, links as blockLinks } from "../Block";
import styles from "./styles.css";

export const links = () => [
	...blockLinks(),
	{ rel: "stylesheet", href: styles },
];

const awards = (users: any, polls: PollData[]) => [
	{
		name: "Poll Newbie",
		description: "Voted less than 7 times in total",
		requirements: (users: any) => {
			return users.filter((user: any) => user.polls.total < 7);
		},
	},
	{
		name: "Poll Acquaintance",
		description: "Voted more than 7 times in total",
		requirements: (users: any) => {
			return users.filter((user: any) => user.polls.total > 7);
		},
	},
	{
		name: "no-stopping-me-now",
		description: "Voted more than 14 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 14),
	},
	{
		name: "'Long Polling'",
		description: "Voted more than 21 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 21),
	},
	{
		name: "Poll-a-holic",
		description: "Voted more than 28 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 28),
	},
	{
		name: "Poll collector",
		description: "Voted more than 35 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 35),
	},
	{
		name: "Poll Nerdo",
		description: "Voted more than 46 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 46),
	},
	{
		name: "Permanently plugged in",
		description: "Voted more than 60 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 60),
	},
	{
		name: "Truly poll addicted",
		description: "Voted more than 71 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 71),
	},
	{
		name: "Polls are a nerds best friend",
		description: "Voted more than 82 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 82),
	},
	{
		name: "Polls Galore!",
		description: "Voted more than 95 times in total",
		requirements: (users: any) =>
			users.filter((user: any) => user.polls.total > 95),
	},
	{
		name: "HTML Hobbyist",
		description: "Participated in HTML polls the most",
		requirements: (users: any) => {
			const HTMLPolls = polls.filter((poll) => poll.category === "html");
			const userIds = HTMLPolls.filter((polls) => polls.voted.length > 0)
				.map((polls) => polls.voted.map((vote) => vote.userId))
				.flat();

			const id = userIds.reduce((previous, current, i, arr) =>
				arr.filter((item) => item === previous).length >
				arr.filter((item) => item === current).length
					? previous
					: current
			);

			return users.filter((user: any) => user.id === id);
		},
		// requirements: users.filter((user: any) => {
		// const HTMLPolls = polls.filter((poll) => poll.category === "html");
		// const result = HTMLPolls.filter((poll) =>
		// 	poll.voted.find((vote) => vote.userId === user.id)
		// )
		// const u = [...users.map((user) => ({ user, total: result }))];
		// }),
	},
];

type Props = {
	users: any;
	polls: PollData[];
};

export type Award = {
	name: string;
	requirements: (users: any, polls: PollData[]) => string[];
	description: string;
};

const calculateColorTintsByTotalUsers = (
	total: number,
	totalAwardsEarned: number
) => {
	return Math.round((100 / total) * totalAwardsEarned);
};

export const AwardsBoard: FC<Props> = ({ users, polls }) => {
	const [awardInfo, setAwardInfo] = useState<Award | null>(null);

	console.log("Award Board render");
	return (
		<aside className="awards-container">
			<span>Secret pixel board</span>
			<section className="blocks-container unlock-container">
				{awards(users, polls).map((award) => {
					const percentage = calculateColorTintsByTotalUsers(
						users.length,
						award.requirements(users).length
					);

					return (
						<Fragment key={award.name}>
							<Block
								award={award}
								setAwardInfo={setAwardInfo}
								percentage={percentage}
							/>
						</Fragment>
					);
				})}
			</section>
			<section className="blocks-container">
				<div className="legenda-container">
					<span className="small-text">Unlocked by less voters</span>
					<Block percentage={0} />
					<Block percentage={25} />
					<Block percentage={50} />
					<Block percentage={75} />
					<Block percentage={100} />
					<span className="small-text">Unlocked by more voters</span>
				</div>
			</section>
			<section>
				{awardInfo && (
					<>
						<h3>{awardInfo.name}</h3>
						<span>{awardInfo.description}</span>
						<ul>
							<span>Unlocked by:</span>
							{awardInfo
								.requirements(users, polls)
								.map((user: any) => {
									return (
										<li key={user.email}>
											{user?.displayName}
										</li>
									);
								})}
							{/* {awardInfo.requirements.map((user: any) => (
									<li key={user.id}>{user.displayName}</li>
								))} */}
						</ul>
					</>
				)}
			</section>
		</aside>
	);
};