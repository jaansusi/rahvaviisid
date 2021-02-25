import abcjs from "abcjs";
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';


const TunePlayer = (({ formData, editable }) => {
  let melodyData = formData.tuneMelodies;
  let [combinedData, setCombinedData] = useState('');
  editable = editable === undefined ? false : editable;
  useEffect(() => {
    setCombinedData(() => {
      let melodyLines = melodyData.melody.split('\n');
      let wordsLines = melodyData.words.split('\n');
      let melodyAndWords = melodyLines.map((melodyLine, i) => {
        return melodyLine + ((wordsLines[i] === undefined || wordsLines[i] === '') ? '' : '\nw: ' + wordsLines[i]);
      });
      return [
        melodyData.customInput === '' ? '' : melodyData.customInput,
        melodyData.alter === '' ? '' : ('K: ' + melodyData.alter),
        melodyData.tempo === '' ? '' : ('Q: ' + melodyData.tempo),
        melodyData.title === '' ? '' : ('T: ' + melodyData.title),
        melodyData.noteLength === '' ? '' : ('L: ' + melodyData.noteLength),
        melodyData.reference === '' ? '' : ('X: ' + melodyData.reference),
        melodyData.author === '' ? '' : ('Z: ' + melodyData.author),
      ].concat(melodyAndWords).filter((elem) => elem !== '').join('\n');
    });
    let visualObj = abcjs.renderAbc('player', combinedData)[0];
    let synthControl = new abcjs.synth.SynthController();
    synthControl.load("#audio", null, { displayRestart: true, displayPlay: true, displayProgress: true });
    synthControl.setTune(visualObj, false);
  }, [formData, melodyData, combinedData]);

  return (
    <Grid item xs={12}>
      <div id="player"></div>
      <div style={{ display: (melodyData.melody === undefined ? 'none' : 'default') }} id="audio"></div>
        {/* <Grid item xs={12} className='form-edit-item'>
          <TextField label='debug' value={combinedData} multiline fullWidth rows='10' variant='outlined' />
        </Grid> */}
    </Grid>
  );
});

export default TunePlayer;

