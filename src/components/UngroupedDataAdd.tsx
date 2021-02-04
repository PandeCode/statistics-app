import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { UngroupedData } from "../UngroupedData";

interface Props {
	addUngroupedData: (data: UngroupedData) => void;
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
export const UngroupedDataAdd: React.FC<Props> = ({ addUngroupedData }) => {
	const [x, setX] = useState(0);
	const [frequency, setFrequency] = useState(1);
	const [error, setError] = useState("");

	const addData = () => {
		if (frequency > 0) {
			addUngroupedData(new UngroupedData(x, frequency));
		}
	};
	return (
		<>
			<ShortedInput
				error={error}
				helperText={"Start of range"}
				value={x}
				setMethod={setX}
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
		</>
	);
};
