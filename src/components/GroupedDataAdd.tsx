import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { GroupedData } from "../GroupedData";

interface Props {
	addGroupedData: (groupedData: GroupedData) => void;
}

const ShortedInput: React.FC<{
	error: string;
	helperText: string;
	value: number;
	setMethod: (value: React.SetStateAction<number>) => void;
}> = ({ error, helperText, value, setMethod }) => {
	const changeText = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		setMethod: (value: React.SetStateAction<number>) => void,
	) => {
		setMethod(Number(e.target.value));
	};

	return (
		<>
			<TextField
				error={error ? true : false}
				helperText={error ? error : helperText}
				value={value}
				type="number"
				onChange={(e) => changeText(e, setMethod)}
			/>
		</>
	);
};
export const GroupedDataAdd: React.FC<Props> = ({ addGroupedData }) => {
	const [start, setStart] = useState(0);
	const [stop, setStop] = useState(1);
	const [frequency, setFrequency] = useState(1);
	const [error, setError] = useState("");

	const vaildateRange = () => {
		if (stop <= start) {
			setError("Stop Position cannot be lager than start position");
		} else {
			setError("");
		}
	};

	useEffect(vaildateRange, [start, stop]);

	const addData = () => {
		if (stop > start) {
			addGroupedData(new GroupedData(start, stop, frequency));
		}
	};

	return (
		<div>
			<ShortedInput
				error={error}
				helperText={"Start of range"}
				value={start}
				setMethod={setStart}
			/>
			<ShortedInput
				error={error}
				helperText="End of range"
				value={stop}
				setMethod={setStop}
			/>
			<ShortedInput
				value={frequency}
				error={error}
				helperText="Frequency"
				setMethod={setFrequency}
			/>

			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				onClick={addData}
			>
				Add
			</Button>
		</div>
	);
};
