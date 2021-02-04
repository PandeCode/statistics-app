import React from "react";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	LineSeries,
	Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, ArgumentScale } from "@devexpress/dx-react-chart";
import { Paper } from "@material-ui/core";
import { line as _line } from "d3-shape";
import { scalePoint as _scalePoint } from "d3-scale";

interface Props {
	data: {
		x: number;
		frequency: number;
	}[];
}

export const PolygonGraph: React.FC<Props> = ({ data }) => {
	const parsedData = data.map((value: { x: number; frequency: number }) => {
		return {
			x: value.x,
			frequency: value.frequency,
		};
	});

	return (
		<Paper>
			<Chart data={parsedData}>
				<ArgumentScale />
				<ArgumentAxis />
				<ValueAxis />

				<LineSeries valueField="frequency" argumentField="x" />

				<Title text="Polygon Graph" />
				<Animation />
			</Chart>
		</Paper>
	);
};
