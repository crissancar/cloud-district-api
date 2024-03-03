import { Big as BigJS } from 'big.js';

export class Big {
	static create(value: string | number): Big.Big {
		return new BigJS(value).round(2);
	}

	static createRoundedString(value: string): string {
		return new BigJS(value).round(2).toFixed(2);
	}

	static toRoundedString(big: Big.Big): string {
		return big.round(2).toFixed(2);
	}

	static round(big: Big.Big): Big.Big {
		return big.round(2);
	}

	static plus(big: Big.Big, toPlus: Big.Big): Big.Big {
		return big.plus(toPlus);
	}

	static minus(big: Big.Big, toMinus: Big.Big): Big.Big {
		return big.minus(toMinus);
	}

	static lessThan(big: Big.Big, value: number): boolean {
		return big.lt(value);
	}
}
