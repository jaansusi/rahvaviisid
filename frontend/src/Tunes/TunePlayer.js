import abcjs from 'abcjs';
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { TuneService } from '../Services';

export const TunePlayer = ({ elementData, editable, index }) => {
	editable = editable === undefined ? false : editable;
	useEffect(() => {
		let combinedData = TuneService.CombineData(elementData);
		let visualObj = abcjs.renderAbc('player' + index, combinedData)[0];
		let synthControl = new abcjs.synth.SynthController();
		synthControl.load('#audio' + index, null, {
			displayRestart: true,
			displayPlay: true,
			displayProgress: true,
		});
		synthControl.setTune(visualObj, false);
	}, [elementData, index]);

	return (
		<Grid item xs={12}>
			<div id={'player' + index}></div>
			<div
				style={{
					display:
						elementData.melody === undefined ? 'none' : 'default',
				}}
				id={'audio' + index}
			></div>
		</Grid>
	);
};