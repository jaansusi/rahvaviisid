import abcjs from 'abcjs';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { TuneService } from '../../../Services';

export const PlayerViewComponent = ({ elementData, index, edit }) => {
	useEffect(() => {
		let visualObj = abcjs.renderAbc('player' + index, TuneService.CombineData(elementData))[0];
		let synthControl = new abcjs.synth.SynthController();
		synthControl.load('#audio' + index, null, {
			displayRestart: true,
			displayPlay: true,
			displayProgress: true,
		});
		synthControl.setTune(visualObj, false);
	}, [elementData, index, elementData.alter, elementData.customInput, elementData.melody, elementData.noteLength, elementData.tempo, elementData.words]);

	return (
		<Grid item xs={12}>
			<Grid container direction='row' alignItems='center'>
				<Grid item>
					<div id={'player' + index}></div>
				</Grid>
			</Grid>
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