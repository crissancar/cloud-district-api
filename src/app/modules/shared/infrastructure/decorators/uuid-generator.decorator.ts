import { createParamDecorator } from '@nestjs/common';

import { Uuid } from '../../application/services/uuid.service';

export const UuidGenerator = createParamDecorator((): string => {
	return Uuid.random();
});
