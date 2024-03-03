/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const OnEvents = (events: Array<string>) =>
	applyDecorators(...events.map((event) => OnEvent(event)));
