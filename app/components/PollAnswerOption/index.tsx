import React from "react";
import { useAuth } from "~/providers/AuthProvider";
import { Answer, PollData, Voted } from "~/utils/polls";
import { CodeBlock } from "../../ui/CodeBlock";
import { OptionInput } from "../OptionInput";

interface Props {
	idx: number;
	poll: PollData;
	answer: Answer;
	showVotedBy: boolean;
	getVotesFromAllUsers: (answerId: string) => any[];
	selectedVotes: Voted[];
	setSelectedVotes: (votes: Voted[]) => void;
}

const PollAnswerOption: React.FC<Props> = ({
	idx,
	poll,
	answer,
	showVotedBy,
	getVotesFromAllUsers,
	selectedVotes,
	setSelectedVotes,
}) => {
	const { user, isAdmin } = useAuth();

	const isChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked && poll.type === "radio") {
			return setSelectedVotes([
				...selectedVotes.filter(
					(selected) => selected.answerId === e.target.id
				),
				{
					answerId: e.target.id,
					userId: user?.firebase.id || "empty",
				},
			]);
		}

		if (e.target.checked && poll.type === "checkbox") {
			setSelectedVotes([
				...selectedVotes,
				{
					answerId: e.target.id,
					userId: user?.firebase.id || "empty",
				},
			]);
		} else {
			const selectedPoll = selectedVotes.filter(
				(selected) => selected.answerId !== e.target.id
			);

			setSelectedVotes(selectedPoll);
		}
	};

	return (
		<>
			<OptionInput
				answer={answer}
				selectable={true}
				isChecked={isChecked}
			/>
			{showVotedBy && isAdmin && (
				<p>
					{getVotesFromAllUsers(answer.id).map((user) => (
						<strong key={user.id}>{user.email} </strong>
					))}
				</p>
			)}
		</>
	);
};

export default PollAnswerOption;
