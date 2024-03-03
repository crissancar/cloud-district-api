export interface ClubPlayerSignedEventPayload {
	club: {
		id: string;
		remainingBudget: string;
	};
	player: {
		id: string;
		salary: string;
	};
}
