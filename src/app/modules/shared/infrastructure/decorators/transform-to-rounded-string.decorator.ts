import { Transform } from 'class-transformer';

import { Big } from '../../application/services/big.service';

const regex = /^[0-9]*\.?[0-9]*$/;

export const TransformToRoundedString = (): PropertyDecorator =>
	Transform(({ value }) => {
		if (regex.test(String(value))) {
			return Big.createRoundedString(String(value));
		}

		return undefined;
	});
