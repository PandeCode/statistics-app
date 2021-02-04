import _ from "lodash";
import { meanOfUngroupedData } from "./UngroupedData";

export class GroupedData {
	startIndex: number;
	stopIndex: number;
	frequency: number;

	cf?: number;
	upperClassBoundary?: number;
	lowerClassBoundary?: number;

	constructor(_startIndex: number, _stopIndex: number, _frequency: number) {
		this.startIndex = _startIndex;
		this.stopIndex = _stopIndex;
		this.frequency = _frequency;
	}

	get x() {
		return meanOfUngroupedData([this.startIndex, this.stopIndex]);
	}

	get fx() {
		return this.x * this.frequency;
	}

	/** * @deprecated The method should not be used very computational heavy depending on data set */
	get items() {
		return _.range(this.startIndex, this.stopIndex);
	}
}

export class GroupedDataSet {
	groupedDataArray: GroupedData[];

	constructor(_groupedDataArray: GroupedData[]) {
		this.groupedDataArray = _groupedDataArray;
		this.fixData();
	}

	fixData() {
		const groupedDataArray = this.groupedDataArray;

		groupedDataArray.forEach((groupedData, index) => {
			// LowerClass Boundary
			if (groupedDataArray[index - 1]) {
				groupedData.lowerClassBoundary = meanOfUngroupedData([
					groupedDataArray[index - 1].stopIndex,
					groupedData.startIndex,
				]);
			} else {
				// predict it
			}

			// UpperClass Boundary
			// if (index != groupedDataArray.length - 1) {
			if (groupedDataArray[index + 1]) {
				groupedData.upperClassBoundary = meanOfUngroupedData([
					groupedDataArray[index + 1].startIndex,
					groupedData.stopIndex,
				]);
			} else {
				//predict it
			}
		});

		// cumulative frequency
		if (groupedDataArray.length) {
			const originalFirstFrequency = groupedDataArray[0].frequency;
			groupedDataArray[0].cf = originalFirstFrequency;

			groupedDataArray.reduce((acc, cur) => {
				acc.frequency = acc.frequency + cur.frequency;
				cur.cf = acc.frequency;
				return acc;
			});

			groupedDataArray[0].frequency = originalFirstFrequency;
		}
	}

	get interval() {
		if (this.groupedDataArray.length <= 0) return 0;
		return (
			this.groupedDataArray[0].stopIndex -
			this.groupedDataArray[0].startIndex +
			1
		);
	}

	get sumationF() {
		if (this.groupedDataArray.length <= 0) return 0;
		let fList = this.groupedDataArray.map((val) => val.frequency);
		return fList.reduce((acc, cur) => acc + cur);
	}

	get sumationFx() {
		if (this.groupedDataArray.length <= 0) return 0;
		let fxList = this.groupedDataArray.map((val) => val.fx);
		return fxList.reduce((acc, cur) => acc + cur);
	}

	get mean() {
		if (this.groupedDataArray.length <= 0) return 0;
		return this.sumationFx / this.sumationF;
	}

	get mode() {
		if (this.groupedDataArray.length <= 1) return 0;
		/*
			mode = Li +  ( <1> / <1> +<2>) i
		*/

		let modeData = new GroupedData(0, 0, 0);

		this.groupedDataArray.forEach((data) => {
			if (data.frequency > modeData.frequency) {
				modeData = data;
			}
		});

		let lowerClassBoundary = modeData.lowerClassBoundary ?? 0;
		if (lowerClassBoundary == 0) {
			// Screw this
			throw Error("Lower Class Boundary Undefined");
		}

		let delta1 =
			modeData.frequency -
			this.groupedDataArray[this.groupedDataArray.indexOf(modeData) - 1]
				.frequency;

		let delta2 =
			modeData.frequency -
			this.groupedDataArray[this.groupedDataArray.indexOf(modeData) + 1]
				.frequency;

		// return "Broken";
		return (
			lowerClassBoundary + this.interval * (delta1 / (delta2 + delta1))
		);
	}

	get median() {
		/*
			Li + ((n/2 - cfb)/f)i
		*/

		if (this.groupedDataArray.length <= 1) return 0;

		const nOutOf2 = this.sumationF / 2;

		// Hardest Part

		let medianData: GroupedData = new GroupedData(0, 1, 1);
		for (const data of this.groupedDataArray) {
			if (Number(data.cf) > nOutOf2) {
				medianData = data;
				break;
			}
		}

		const lowerClassBoundary = Number(medianData.lowerClassBoundary);
		const frequency = medianData.frequency;
		const cfb = Number(
			this.groupedDataArray[this.groupedDataArray.indexOf(medianData) - 1]
				.cf,
		);

		const m =
			lowerClassBoundary + this.interval * ((nOutOf2 - cfb) / frequency);

		return m;
	}
}
