import abcjs from 'abcjs';
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

const PlayerViewComponent = ({ elementData, editable, index }) => {
	let [combinedData, setCombinedData] = useState('');
	editable = editable === undefined ? false : editable;
	useEffect(() => {
		
		let visualObj = abcjs.renderAbc('player' + index, combinedData)[0];
		let synthControl = new abcjs.synth.SynthController();
		synthControl.load('#audio' + index, null, {
			displayRestart: true,
			displayPlay: true,
			displayProgress: true,
		});
		synthControl.setTune(visualObj, false);
	}, [elementData, combinedData, index, elementData.alter, elementData.customInput, elementData.melody, elementData.noteLength, elementData.reference, elementData.tempo, elementData.words]);

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

export default PlayerViewComponent;
