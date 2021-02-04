import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
	TableContainer,
	TableCell,
	TableHead,
	Table as MaterialTable,
	Paper,
	TableBody,
	TableRow,
} from "@material-ui/core";

import type { GroupedData } from "../GroupedData";

interface Props {
	data: Array<GroupedData>;
}

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);
const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export const GroupedDataTable: React.FC<Props> = ({ data }: Props) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<MaterialTable
				className={classes.table}
				aria-label="customized table"
			>
				<TableHead>
					<TableRow>
						<StyledTableCell align="left">
							{/*  */}
							Range
						</StyledTableCell>
						<StyledTableCell align="right">
							{/*  */}
							(x)
						</StyledTableCell>
						<StyledTableCell align="right">
							{/* Frequency */}f
						</StyledTableCell>
						<StyledTableCell align="right">
							{/*  */}
							f(x)
						</StyledTableCell>
						<StyledTableCell align="right">
							{/* Cumulative Frequency */}
							cf
						</StyledTableCell>
						<StyledTableCell align="right">
							{/* Class Boundary */}
							cb
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((dataInstance: GroupedData) => (
						<StyledTableRow
							key={`${dataInstance.startIndex},${dataInstance.stopIndex},${dataInstance.frequency}`}
						>
							<StyledTableCell component="th" scope="row">
								{dataInstance.startIndex} -{" "}
								{dataInstance?.stopIndex}
							</StyledTableCell>
							<StyledTableCell align="right">
								{dataInstance.x}
							</StyledTableCell>
							<StyledTableCell align="right">
								{dataInstance.frequency}
							</StyledTableCell>
							<StyledTableCell align="right">
								{dataInstance.fx}
							</StyledTableCell>
							<StyledTableCell align="right">
								{dataInstance.cf}
							</StyledTableCell>
							<StyledTableCell align="right">
								{dataInstance?.lowerClassBoundary} ,{" "}
								{dataInstance?.upperClassBoundary}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</MaterialTable>
		</TableContainer>
	);
};
