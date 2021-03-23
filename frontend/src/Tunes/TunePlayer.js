import abcjs from 'abcjs';
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

const TunePlayer = ({ formData, editable, index }) => {
	let melodyData = formData.tuneMelodies[index];
	let [combinedData, setCombinedData] = useState('');
	editable = editable === undefined ? false : editable;
	useEffect(() => {
		setCombinedData(() => {
			let melodyLines = melodyData.melody.split('\n');
			let wordsLines = melodyData.words.split('\n');
			let melodyAndWords = melodyLines.map((melodyLine, i) => {
				return (
					melodyLine +
					(wordsLines[i] === undefined || wordsLines[i] === ''
						? ''
						: '\nw: ' + wordsLines[i])
				);
			});
			return [
				melodyData.customInput === '' ? '' : melodyData.customInput,
				melodyData.alter === '' ? '' : 'K: ' + melodyData.alter,
				melodyData.tempo === '' ? '' : 'Q: ' + melodyData.tempo,
				melodyData.noteLength === ''
					? ''
					: 'L: ' + melodyData.noteLength,
				//melodyData.title === '' ? '' : ('T: ' + melodyData.title),
				melodyData.reference === '' ? '' : 'X: ' + formData.reference,
				//melodyData.author === '' ? '' : ('Z: ' + melodyData.author),
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
	}, [formData, combinedData, index, melodyData.alter, melodyData.customInput, melodyData.melody, melodyData.noteLength, melodyData.reference, melodyData.tempo, melodyData.words]);

	return (
		<Grid item xs={12}>
			<div id={'player' + index}></div>
			<div
				style={{
					display:
						melodyData.melody === undefined ? 'none' : 'default',
				}}
				id={'audio' + index}
			></div>
		</Grid>
	);
};

export default TunePlayer;
