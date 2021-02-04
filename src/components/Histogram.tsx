import React from "react";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	BarSeries,
	Title,
	Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import type { GroupedData } from "src/GroupedData";
import { Paper } from "@material-ui/core";

interface Props {
	data: {
		lowerClassBoundary: number;
		frequency: number;
	}[];
}

export const Histogram: React.FC<Props> = ({ data }: Props) => {
	const parsedData = data.map((value) => {
		return {
			lowerClassBoundary: value.lowerClassBoundary?.toString(),
			frequency: value.frequency,
		};
	});

	return (
		<Paper>
			<Chart data={parsedData}>
				<ArgumentAxis />
				<ValueAxis />

				<BarSeries
					valueField="frequency"
					argumentField="lowerClassBoundary"
				/>

				<Title text="Historgram" />
				<Animation />
			</Chart>
		</Paper>
	);
};
