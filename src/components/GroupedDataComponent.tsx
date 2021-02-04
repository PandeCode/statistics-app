import React, { useEffect, useState } from "react";

import { Grid, Button, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { GroupedDataAdd } from "./GroupedDataAdd";
import { GroupedDataTable } from "./GroupedDataTable";
import { Histogram } from "./Histogram";
import { CumulativeFrequencyCurve } from "./CumulativeFrequencyCurve";
import { PolygonGraph } from "./PolygonGraph";

import { GroupedData, GroupedDataSet } from "../GroupedData";

import { groupedTests } from "../Tests";

interface Props {}

export const GroupedDataComponent: React.FC<Props> = ({}: Props) => {
	type Views =
		| "table"
		| "histogram"
		| "CumulativeFrequencyCurve"
		| "polygonGraph";

	const [view, setView] = useState<Views>("table");

	const handleChange = (
		_event: React.MouseEvent<HTMLElement, MouseEvent>,
		newView: Views,
	) => {
		setView(newView);
	};

	const [groupedDataSet, setGroupedDataSet] = useState(
		new GroupedDataSet([]),
	);

	const [groupedDataList, setGroupedDataList] = useState(
		groupedDataSet.groupedDataArray,
	);

	const addGroupedData = (groupedData: GroupedData) => {
		if (groupedData.frequency > 0) {
			setGroupedDataList([...groupedDataList, groupedData]);
		}
	};

	useEffect(() => {
		setGroupedDataSet(new GroupedDataSet(groupedDataList));
	}, [groupedDataList]);

	return (
		<div>
			<GroupedDataAdd addGroupedData={addGroupedData} />
			<Button
				onClick={() => {
					setGroupedDataList(groupedTests[2]);
				}}
			>
				Sample Data
			</Button>
			<Typography>
				Interval: {groupedDataSet.interval} <br />
				Mean: {groupedDataSet.mean} <br />
				Median: {groupedDataSet.median} <br />
				Mode: {groupedDataSet.mode} <br />
				Sumation f: {groupedDataSet.sumationF} <br />
				Sumation f(x): {groupedDataSet.sumationFx} <br />
			</Typography>
			<Grid item>
				<ToggleButtonGroup
					color="primary"
					size="large"
					value={view}
					exclusive
					onChange={handleChange}
				>
					<ToggleButton value="table">Table</ToggleButton>
					<ToggleButton value="histogram">Histogram</ToggleButton>
					<ToggleButton value="CumulativeFrequencyCurve">
						CF Curve
					</ToggleButton>
					<ToggleButton value="polygonGraph">
						Polygon Graph
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>

			{view == "table" ? (
				<GroupedDataTable data={groupedDataList} />
			) : null}
			{view == "histogram" ? <Histogram data={groupedDataList} /> : null}
			{view == "CumulativeFrequencyCurve" ? (
				<CumulativeFrequencyCurve data={groupedDataList} />
			) : null}
			{view == "polygonGraph" ? (
				<PolygonGraph data={groupedDataList} />
			) : null}
		</div>
	);
};
