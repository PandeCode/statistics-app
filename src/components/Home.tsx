import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { GroupedDataComponent } from "./GroupedDataComponent";
import { UngroupedDataComponent } from "./UngroupedDataComponent";

interface Props {}

export const Home: React.FC<Props> = ({}) => {
	type Views = "groupedData" | "ungroupedData";

	const [view, setView] = useState<Views>("ungroupedData");

	const handleChange = (
		_event: React.MouseEvent<HTMLElement, MouseEvent>,
		newView: Views,
	) => {
		setView(newView);
	};

	return (
		<div>
			<Grid item>
				<ToggleButtonGroup
					color="primary"
					size="large"
					value={view}
					exclusive
					onChange={handleChange}
				>
					<ToggleButton value="ungroupedData">
						Ungrouped Data
					</ToggleButton>
					<ToggleButton value="groupedData">
						Grouped Data
					</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
			{view == "groupedData" ? <GroupedDataComponent /> : null}
			{view == "ungroupedData" ? <UngroupedDataComponent /> : null}
		</div>
	);
};
