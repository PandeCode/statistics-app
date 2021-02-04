import React, { useState, useEffect } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

import { UngroupedData, UngroupedDataSet } from "../UngroupedData";

import { UngroupedDataAdd } from "./UngroupedDataAdd";
import { UngroupedDataTable } from "./UngroupedDataTable";
import { PolygonGraph } from "./PolygonGraph";

import { ungroupedTests } from "../Tests";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

interface Props {}

export const UngroupedDataComponent: React.FC<Props> = ({}: Props) => {
	const [ungroupedDataSet, setUngroupedDataSet] = useState(
		new UngroupedDataSet([]),
	);
	const [ungroupedDataList, setUngroupedDataList] = useState<UngroupedData[]>(
		[],
	);

	const addData = (data: UngroupedData) => {
		setUngroupedDataList([...ungroupedDataList, data]);
	};
	type Views = "table" | "polygonGraph";

	const [view, setView] = useState<Views>("table");

	const handleChange = (
		_event: React.MouseEvent<HTMLElement, MouseEvent>,
		newView: Views,
	) => {
		setView(newView);
	};

	useEffect(() => {
		setUngroupedDataSet(new UngroupedDataSet(ungroupedDataList));
	}, [ungroupedDataList]);

	return (
		<div>
			<UngroupedDataAdd addUngroupedData={addData} />
			<Button
				onClick={() => {
					setUngroupedDataList(ungroupedTests[0]);
				}}
			>
				Sample Data
			</Button>
			<Typography>
				Mean: {ungroupedDataSet.mean} <br />
				Median: {ungroupedDataSet.median} <br />
				Mode: {ungroupedDataSet.mode.map((val) => `${val}, `)} <br />
				Sumation f: {ungroupedDataSet.sumationF} <br />
				Sumation f(x): {ungroupedDataSet.sumationFx} <br />
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

					<ToggleButton value="polygonGraph">
						Polygon Graph
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
			{view == "table" ? (
				<UngroupedDataTable data={ungroupedDataList} />
			) : null}
			{view == "polygonGraph" ? (
				<PolygonGraph data={ungroupedDataList} />
			) : null}
		</div>
	);
};
