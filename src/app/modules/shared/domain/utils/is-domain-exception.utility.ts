/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDomainException = (error: unknown, exceptions: Array<any>): boolean => {
	return exceptions.some((exception) => error instanceof exception);
};
