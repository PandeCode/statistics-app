import React from "react";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	LineSeries,
	Title,
	Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation, ArgumentScale } from "@devexpress/dx-react-chart";
import type { GroupedData } from "src/GroupedData";
import { Paper, Typography, withStyles } from "@material-ui/core";
import { curveCatmullRom, line as _line } from "d3-shape";
import { scalePoint as _scalePoint } from "d3-scale";

/*
This is just because i can't cast in tsx
Also i can't
 import foo : IFoo from "foo"
cause i can't use it in destructing
just bear 'with this hacky fix which i don't think will 
cause issues in the future
*/

const line: any = _line;
const scalePoint: any = _scalePoint;

/* Styles css and other stuff i am not good at so i just would rather leave it alone for it works and changing any thing could break everything */
const Line: any = (
	props: JSX.IntrinsicAttributes &
		LineSeries.PathSeriesProps & {
			[x: string]: any;
			className?: string | undefined;
			style?: React.CSSProperties | undefined;
		} & { children?: React.ReactNode },
) => (
	<LineSeries.Path
		{...props}
		path={line()
			.x(({ arg }: any) => arg)
			.y(({ val }: any) => val)
			.curve(curveCatmullRom)}
	/>
);

const titleStyles: any = {
	title: {
		textAlign: "center",
		width: "100%",
		marginBottom: "10px",
	},
};
const Text = withStyles(titleStyles)((props: { text: any; classes: any }) => {
	const { text, classes } = props;
	const [mainText, subText] = text.split("\\n");
	return (
		<div className={classes.title}>
			<Typography component="h3" variant="h5">
				{mainText}
			</Typography>
			<Typography variant="subtitle1">{subText}</Typography>
		</div>
	);
});

const legendStyles: any = () => ({
	root: {
		display: "flex",
		margin: "auto",
		flexDirection: "row",
	},
});
const legendLabelStyles: any = (theme: { spacing: (arg0: number) => any }) => ({
	label: {
		marginBottom: theme.spacing(1),
		whiteSpace: "nowrap",
	},
});
const legendItemStyles: any = () => ({
	item: {
		flexDirection: "column-reverse",
	},
});

const legendRootBase = ({ classes, ...restProps }: any) => (
	<Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }: any) => (
	<Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }: any) => (
	<Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
	legendLabelBase,
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
	legendItemBase,
);
/* end of styles */

interface Props {
	data: GroupedData[];
}

export const CumulativeFrequencyCurve: React.FC<Props> = ({ data }) => {
	const parsedData = data.map((value, index) => {
		return {
			upperClassBoundary: value.upperClassBoundary,
			cf: value.cf,
		};
	});

	return (
		<Paper>
			<Chart data={parsedData}>
				<ArgumentScale factory={scalePoint} />
				<ArgumentAxis />
				<ValueAxis />

				<LineSeries
					valueField="cf"
					argumentField="upperClassBoundary"
					seriesComponent={Line}
				/>

				<Title text="Cumulative Frequency Curve" />
				<Animation />
			</Chart>
		</Paper>
	);
};
