import classNames from "classnames";
import React, { FC, Fragment, useState } from "react";
import { PollCategory, PollData } from "~/utils/polls";
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
		requirements: (users: any) =>
			getUserWithMostPollsAnsweredByCategory(users, polls, "html"),
	},
	{
		name: "Markup Master",
		description: "Have the most correct HTML answers",
		requirements: (users: any) =>
			getUserWithMostCorrectPollsByCategory(users, polls, "html"),
	},
	{
		name: "CSS Connoisseur",
		description: "Have the most correct CSS answers",
		requirements: (users: any) =>
			getUserWithMostCorrectPollsByCategory(users, polls, "css"),
	},
	{
		name: "Forza Frontend",
		description: "Have the most correct General Frontend answers",
		requirements: (users: any) =>
			getUserWithMostCorrectPollsByCategory(
				users,
				polls,
				"general frontend"
			),
	},
	{
		name: "'every()thing' correct",
		description: "Have the most correct JS answers",
		requirements: (users: any) =>
			getUserWithMostCorrectPollsByCategory(users, polls, "javascript"),
	},
	{
		name: "Type Specialist",
		description: "Have the most correct TS answers",
		requirements: (users: any) =>
			getUserWithMostCorrectPollsByCategory(users, polls, "typescript"),
	},
	{
		name: "React Rocket",
		description: "Have the most correct React answers",
		requirements: (users: any) =>
			getUserWithMostCorrectPollsByCategory(users, polls, "react"),
	},
	{
		name: "CSS Carrier",
		description: "Participated in CSS polls the most",
		requirements: (users: any) =>
			getUserWithMostPollsAnsweredByCategory(users, polls, "css"),
	},
	{
		name: "React 4 U",
		description: "Participated in React polls the most",
		requirements: (users: any) =>
			getUserWithMostPollsAnsweredByCategory(users, polls, "react"),
	},
	{
		name: "TypeScript Tinkerer",
		description: "Participated in TypeScript polls the most",
		requirements: (users: any) =>
			getUserWithMostPollsAnsweredByCategory(users, polls, "typescript"),
	},
	{
		name: "Const(ant) voter",
		description: "Participated in JavaScript polls the most",
		requirements: (users: any) =>
			getUserWithMostPollsAnsweredByCategory(users, polls, "javascript"),
	},
	{
		name: "Frontend Fury",
		description: "Participated in General Frontend polls the most",
		requirements: (users: any) =>
			getUserWithMostPollsAnsweredByCategory(
				users,
				polls,
				"general frontend"
			),
	},
	{
		name: "Speed Demon",
		description:
			"Always being the first answering polls (Can only be earned when you atleast answered the poll 7 times as first)",
		requirements: (users: any) => {
			const NUMBER_OF_POLLS_NEEDED = 7;
			const userIds = polls
				.map((poll) => poll.voted.map((vote) => vote.userId)[0])
				.filter((a) => a);

			const [id] = Object.entries(getHighestOccurenceByIds(userIds))
				.filter(([key, value]) => value >= NUMBER_OF_POLLS_NEEDED)
				.flat();

			return users.filter((user: any) => user.id === id);
		},
	},
	{
		name: "King of the rock",
		description: "Have the highest total polls",
		requirements: (users: any) => {
			const userWithHighestTotal = users.reduce(
				(prev, curr) => {
					return prev.polls.total > curr.polls.total ? prev : curr;
				},
				{ polls: { total: 0 } }
			);

			return [userWithHighestTotal];
		},
	},
];

const getHighestOccurenceByIds = (array: string[]) => {
	const counts: Record<string, number> = {};

	for (const num of array) {
		counts[num] = counts[num] ? counts[num] + 1 : 1;
	}

	return counts;
};

const getUserWithMostCorrectPollsByCategory = (
	users: any,
	polls: PollData[],
	category: PollCategory
) => {
	const allPolls = polls.filter((poll) => poll.category === category);
	const correctAnswers = allPolls.map((polls) => polls.correctAnswers).flat();

	const voted = allPolls.map((polls) => polls.voted).flat();
	const userIds = voted
		.filter((vote) =>
			correctAnswers.find((correct) => vote.answerId === correct.id)
		)
		.map((data) => users.find((user: any) => user.id === data.userId))
		.map((u) => u.id);

	const id = userIds.reduce((previous, current, i, arr) => {
		return arr.filter((item) => item === previous).length >
			arr.filter((item) => item === current).length
			? previous
			: current;
	}, "");

	return users.filter((user: any) => user.id === id);
};

const getUserWithMostPollsAnsweredByCategory = (
	users: any,
	polls: PollData[],
	category: PollCategory
) => {
	const allPolls = polls.filter((poll) => poll.category === category);

	const userIds = allPolls
		.filter((polls) => polls.voted.length > 0)
		.map((polls) => polls.voted.map((vote) => vote.userId))
		.flat();

	const id = userIds.reduce((previous, current, i, arr) => {
		return arr.filter((item) => item === previous).length >
			arr.filter((item) => item === current).length
			? previous
			: current;
	}, "");

	return users.filter((user: any) => user.id === id);
};

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

	return (
		<aside className="awards-container">
			<h3 className="small-text">
				Click on a block to view award details
			</h3>
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

			{awardInfo && (
				<section className="award-info-container">
					<h3 className="award-title">{awardInfo.name}</h3>
					<span className="award-description">
						{awardInfo.description}
					</span>
					<ul className="award-user-list">
						<p className="unlocked-by">Unlocked by:</p>
						{awardInfo
							.requirements(users, polls)
							.map((user: any) => {
								return (
									<li
										key={user.email}
										className="award-list-item"
									>
										<img
											referrerPolicy="no-referrer"
											src={user.photoURL || ""}
											width={50}
											height={50}
											className="profile-img"
										/>
										<span className="username">
											{user?.displayName}
										</span>
									</li>
								);
							})}
						{/* {awardInfo.requirements.map((user: any) => (
									<li key={user.id}>{user.displayName}</li>
								))} */}
					</ul>
				</section>
			)}
		</aside>
	);
};
