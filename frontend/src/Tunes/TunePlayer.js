import abcjs from 'abcjs';
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

const TunePlayer = ({ elementData, editable, index }) => {
	let [combinedData, setCombinedData] = useState('');
	editable = editable === undefined ? false : editable;
	useEffect(() => {
		setCombinedData(() => {
			let melodyLines = elementData.melody.split('\n');
			let wordsLines = elementData.words.split('\n');
			let melodyAndWords = melodyLines.map((melodyLine, i) => {
				return (
					melodyLine +
					(wordsLines[i] === undefined || wordsLines[i] === ''
						? ''
						: '\nw: ' + wordsLines[i])
				);
			});
			return [
				elementData.customInput === '' ? '' : elementData.customInput,
				elementData.alter === '' ? '' : 'K: ' + elementData.alter,
				elementData.tempo === '' ? '' : 'Q: ' + elementData.tempo,
				elementData.noteLength === ''
					? ''
					: 'L: ' + elementData.noteLength,
				//elementData.title === '' ? '' : ('T: ' + elementData.title),
				elementData.reference === '' ? '' : 'X: ' + elementData.reference,
				//elementData.author === '' ? '' : ('Z: ' + elementData.author),
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

export default TunePlayer;
