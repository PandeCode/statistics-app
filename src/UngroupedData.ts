export const meanOfUngroupedData = (items: Array<number>): number => {
	return items.reduce((acc: number, cur: number) => acc + cur) / items.length;
};

const muliplyList = <T>(sourceList: T[], frequencyList: number[]): T[] => {
	if (sourceList.length != frequencyList.length)
		throw Error("Lists must be of same size");

	let finishedList: T[] = [];

	for (let i = 0; i < sourceList.length; i++) {
		for (let j = 0; j < frequencyList[i]; j++) {
			finishedList.push(sourceList[i]);
		}
	}

	return finishedList;
};

export class UngroupedData {
	x: number;
	frequency: number;
	cf?: number;

	constructor(_x: number, _frequency: number) {
		this.x = _x;
		this.frequency = _frequency;
	}

	get fx() {
		return this.frequency * this.x;
	}
}

export class UngroupedDataSet {
	ungroupedDataList: UngroupedData[] = [];

	constructor(_ungroupDataList: UngroupedData[]) {
		this.ungroupedDataList = _ungroupDataList;
		this.fixData();
	}

	fixData() {
		const ungroupedDataList = this.ungroupedDataList;

		// Cumulative Frequency
		if (ungroupedDataList.length) {
			const originalFirstFrequency = ungroupedDataList[0].frequency;
			ungroupedDataList[0].cf = originalFirstFrequency;

			ungroupedDataList.reduce((acc, cur) => {
				acc.frequency = acc.frequency + cur.frequency;
				cur.cf = acc.frequency;
				return acc;
			});

			ungroupedDataList[0].frequency = originalFirstFrequency;
		}
	}

	get sumationF() {
		if (this.ungroupedDataList.length <= 0) return 0;
		let fList = this.ungroupedDataList.map((val) => val.frequency);
		return fList.reduce((acc, cur) => acc + cur);
	}

	get sumationFx() {
		if (this.ungroupedDataList.length <= 0) return 0;
		let fxList = this.ungroupedDataList.map((val) => val.fx);
		return fxList.reduce((acc, cur) => acc + cur);
	}

	get mean() {
		if (this.ungroupedDataList.length <= 0) return 0;
		return this.sumationFx / this.sumationF;
	}

	get median() {
		let listLength: number = this.ungroupedDataList.length;

		if (listLength <= 0) return 0;
		if (listLength <= 1) return this.ungroupedDataList[0].x;

		let originalList = this.ungroupedDataList.map((val) => val.x);
		let frequencyList = this.ungroupedDataList.map((val) => val.frequency);

		let finishedList = muliplyList(originalList, frequencyList);

		if (finishedList.length % 2 == 0) {
			return meanOfUngroupedData([
				finishedList[finishedList.length / 2],
				finishedList[finishedList.length / 2 + 1],
			]);
		} else {
			return finishedList[finishedList.length / 2];
		}
	}

	get mode() {
		let highestFrequency: number = 0;

		this.ungroupedDataList.forEach((data) => {
			if (data.frequency >= highestFrequency) {
				highestFrequency = data.frequency;
			}
		});

		let matchingModes = this.ungroupedDataList.filter(
			(val) => val.frequency == highestFrequency,
		);

		return matchingModes.map((val) => val.x);
	}

	get modalFrequency() {
		let highestFrequency: number = 0;
		this.ungroupedDataList.forEach((data) => {
			highestFrequency =
				data.frequency > highestFrequency
					? data.frequency
					: highestFrequency;
		});

		return highestFrequency;
	}
}
