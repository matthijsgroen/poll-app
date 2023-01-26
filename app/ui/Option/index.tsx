import { PropsWithChildren } from "react";
import styles from "./styles.css";
import { Text } from "../Text";
import classNames from "classnames";
import { OptionVotes } from "../../components/OptionVotes";
import TodaysVoters from "~/components/TodaysVoters";

export const variants = [
	"default",
	"active",
	"disabled",
	"correct",
	"wrong",
	"selected",
] as const;
export type Variants = typeof variants[number];

export type OptionProps = {
	id?: string;
	variant?: Variants;
};

export function links() {
	return [{ rel: "stylesheet", href: styles }];
}

export const Option = ({
	id,
	variant = "default",
	children,
}: PropsWithChildren<OptionProps>) => {
	const styles = classNames("option", `option-${variant}`);
	return (
		<label className={styles} htmlFor={id}>
			<Text size="md" variant="primary" tag="span">
				{children}
			</Text>
		</label>
	);
};
