import abcjs from 'abcjs';
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

const TunePlayer = ({ formData, editable, index }) => {
	let [combinedData, setCombinedData] = useState('');
	editable = editable === undefined ? false : editable;
	useEffect(() => {
		setCombinedData(() => {
			let melodyLines = formData.melody.split('\n');
			let wordsLines = formData.words.split('\n');
			let melodyAndWords = melodyLines.map((melodyLine, i) => {
				return (
					melodyLine +
					(wordsLines[i] === undefined || wordsLines[i] === ''
						? ''
						: '\nw: ' + wordsLines[i])
				);
			});
			return [
				formData.customInput === '' ? '' : formData.customInput,
				formData.alter === '' ? '' : 'K: ' + formData.alter,
				formData.tempo === '' ? '' : 'Q: ' + formData.tempo,
				formData.noteLength === ''
					? ''
					: 'L: ' + formData.noteLength,
				//formData.title === '' ? '' : ('T: ' + formData.title),
				formData.reference === '' ? '' : 'X: ' + formData.reference,
				//formData.author === '' ? '' : ('Z: ' + formData.author),
			]
				.concat(melodyAndWords)
				.filter((elem) => elem !== '')
				.join('\n');
		});
		let visualObj = abcjs.renderAbc('player' + index, combinedData)[0];
		let synthControl = new abcjs.synth.SynthController();
		synthControl.load('#audio' + index, null, {
			displayRestart: true,
			displayPlay: true,
			displayProgress: true,
		});
		synthControl.setTune(visualObj, false);
	}, [formData, combinedData, index, formData.alter, formData.customInput, formData.melody, formData.noteLength, formData.reference, formData.tempo, formData.words]);

	return (
		<Grid item xs={12}>
			<div id={'player' + index}></div>
			<div
				style={{
					display:
						formData.melody === undefined ? 'none' : 'default',
				}}
				id={'audio' + index}
			></div>
		</Grid>
	);
};

export default TunePlayer;
