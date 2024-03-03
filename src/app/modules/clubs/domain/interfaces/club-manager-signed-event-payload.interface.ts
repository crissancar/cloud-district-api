export interface ClubManagerSignedEventPayload {
	club: {
		id: string;
		remainingBudget: string;
	};
	manager: {
		id: string;
		salary: string;
	};
}
