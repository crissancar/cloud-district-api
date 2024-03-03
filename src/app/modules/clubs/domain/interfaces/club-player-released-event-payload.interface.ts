export interface ClubPlayerReleasedEventPayload {
	club: {
		id: string;
		revisedBudget: string;
	};
	player: {
		id: string;
	};
}
