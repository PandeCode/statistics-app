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

import type { UngroupedData } from "../UngroupedData";

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

interface Props {
	data: UngroupedData[];
}

export const UngroupedDataTable: React.FC<Props> = ({ data }) => {
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
							(x)
						</StyledTableCell>
						<StyledTableCell align="left">
							{/* Frequency */}f
						</StyledTableCell>
						<StyledTableCell align="left">
							{/*  */}
							f(x)
						</StyledTableCell>
						<StyledTableCell align="left">
							{/* Cumulative Frequency */}
							cf
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((dataInstance: UngroupedData) => (
						<StyledTableRow
							key={`${dataInstance.x},${dataInstance.frequency}`}
						>
							<StyledTableCell align="left">
								{dataInstance.x}
							</StyledTableCell>
							<StyledTableCell align="left">
								{dataInstance.frequency}
							</StyledTableCell>
							<StyledTableCell align="left">
								{dataInstance.fx}
							</StyledTableCell>
							<StyledTableCell align="left">
								{dataInstance.cf}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</MaterialTable>
		</TableContainer>
	);
};
