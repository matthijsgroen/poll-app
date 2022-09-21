// import { db } from "./firebase.client";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	query,
	orderBy,
	where,
} from "firebase/firestore";
import { BlockType } from "~/components/PollForm";
import { db } from "~/utils/firebase";

export type InputTypes = "radio" | "checkbox";
export type PollCategory =
	| "html"
	| "css"
	| "javascript"
	| "typescript"
	| "general frontend"
	| "react";
export type PollStatus = "open" | "closed" | "new" | "needs-revision";
export type Answer = {
	id: string;
	value: string;
	blockType?: BlockType;
};
export type Voted = {
	answerId: string;
	userId: string;
};

export type CorrectAnswers = {
	id: string;
	value: string;
};
export type PollData = {
	id: string;
	question: string;
	answers: Answer[];
	correctAnswers: CorrectAnswers[];
	pollNumber: number | null;
	type: InputTypes | string;
	status: PollStatus;
	voted: Voted[];
	category: PollCategory;
	codeBlock: string;
	openingTime?: number | null;
};

export async function getPollsByOpeningTime() {
	const ref = collection(db, "polls");
	const getQuery = query(ref, orderBy("openingTime", "asc"));
	const querySnapshot = await getDocs(getQuery);

	return querySnapshot.docs
		.map((item) => item.data())
		.filter((poll) => poll.openingTime);
}

export async function getAmountOfClosedPolls() {
	const ref = collection(db, "polls");
	const getQuery = query(ref, where("status", "==", "closed"));

	const ids = await getDocs(getQuery);

	return ids.size;
}

export async function getAmountOfPolls() {
	const ids = await (await getDocs(collection(db, "polls"))).size;

	return ids;
}

export async function createPoll(data: PollData) {
	await addDoc(collection(db, "polls"), data);
	console.info("created poll!");
}

export async function getAllPolls() {
	const ref = collection(db, "polls");
	const getQuery = query(ref, orderBy("pollNumber", "desc"));
	const querySnapshot = await getDocs(getQuery);

	return querySnapshot.docs.map((item) => item.data());
}

export const getDocumentPollIds = async () => {
	const ref = collection(db, "polls");
	const getQuery = query(ref, orderBy("pollNumber", "desc"));

	const ids = await getDocs(getQuery);

	return ids.docs.map((item) => item.id);
};

export const getPollById = async (id: string) => {
	const docRef = await doc(db, "polls", id);
	const snapshot = await getDoc(docRef);

	if (!snapshot.exists) {
		throw new Error("Snapshot doesn't exist");
	} else {
		return snapshot.data();
	}
};

export const updatePollById = async (
	id: string,
	payload: any,
	merge = true
) => {
	const snapshot = await setDoc(doc(db, "polls", id), payload, {
		merge,
	});

	return snapshot;
};
