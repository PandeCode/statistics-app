import { GroupedData } from "./GroupedData";
import { UngroupedData } from "./UngroupedData";

export const groupedTests: GroupedData[][] = [
	[
		new GroupedData(1, 20, 2),
		new GroupedData(21, 40, 4),
		new GroupedData(41, 60, 19),
		new GroupedData(61, 80, 12),
		new GroupedData(81, 100, 3),
	],
	[
		new GroupedData(30, 39, 1),
		new GroupedData(40, 49, 3),
		new GroupedData(50, 59, 8),
		new GroupedData(60, 69, 4),
		new GroupedData(70, 79, 3),
		new GroupedData(80, 89, 1),
	],
	[
		new GroupedData(30, 39, 1),
		new GroupedData(40, 49, 7),
		new GroupedData(50, 59, 10),
		new GroupedData(60, 69, 7),
		new GroupedData(70, 79, 10),
		new GroupedData(80, 89, 5),
	],
	[
		new GroupedData(1, 10, 4),
		new GroupedData(11, 20, 12),
		new GroupedData(21, 30, 20),
		new GroupedData(31, 40, 8),
		new GroupedData(41, 50, 6),
	],
];
export const ungroupedTests: UngroupedData[][] = [
	[
		// mean 14.4333333333
		// mode = 14 , 15 ,16
		// median = 14.5
		new UngroupedData(11, 3),
		new UngroupedData(12, 3),
		new UngroupedData(13, 3),
		new UngroupedData(14, 6),
		new UngroupedData(15, 6),
		new UngroupedData(16, 6),
		new UngroupedData(18, 2),
		new UngroupedData(19, 1),
	],
];
