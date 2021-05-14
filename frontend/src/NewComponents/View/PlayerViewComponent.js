import abcjs from 'abcjs';
import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { TuneService } from '../../Services';
import { useTranslation } from 'react-i18next';
import { DataService } from '../../Services';
import { TuneMelodyModel } from '../../Models';

export const PlayerViewComponent = ({ elementData, index }) => {
	const { t } = useTranslation('common');
	const [downloadLink, setDownloadLink] = useState('')

	let downloadFile = () => {
		DataService.RequestAsset(elementData.id, TuneMelodyModel, );
		const data = new Blob(['test'], { type: 'text/plain' })

		// this part avoids memory leaks
		if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)

		// update the download link state
		setDownloadLink(window.URL.createObjectURL(data))
		// const element = document.createElement("a");
		// const file = new Blob(['test'], { type: 'application/xml' });
		// element.href = URL.createObjectURL(file);
		// element.download = "tune.xml";
		// document.body.appendChild(element); // Required for this to work in FireFox
		// element.click();
	}

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
			<Button onClick={() => downloadFile(elementData.id)} variant='outlined'>{t('melody.export')}</Button>
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