import abcjs from "abcjs";
import React, { useEffect, useState } from 'react';
import './TunePlayer.css';
import { Grid, TextField } from '@material-ui/core';

const TunePlayer = ((props) => {
  let [abcValue, setAbcValue] = useState('X:1\nT:EÜS X  2412 (13)\nL:1/8\nQ:1/4=96\nM:none\nI:linebreak $\nK:C\nV:1 treble nm="MusicXML Part"\nV:1\n g>d dd d>B dd | d>B cB GG GG |$ g>d dd d>B BG | D>D DD GG GG || %4\nw: Las- ke sis- se mär- di- san- did,|las- ke sis- se mar- di- san- did,|mar- di küü- ned kül- me- ta- vad,|mar- di küü- ned kül- me- ta- vad.|');
  let editable = props.editable === undefined ? false : props.editable;

  useEffect(() => {
    let visualObj = abcjs.renderAbc('player', abcValue)[0];
    let synthControl = new abcjs.synth.SynthController();
    synthControl.load("#audio", null, { displayRestart: true, displayPlay: true, displayProgress: true });
    synthControl.setTune(visualObj, false);

  }, [abcValue]);

  return (
    <Grid
      item
      xs={12}>
      <TextField multiline fullWidth rows='5' style={{display: (editable ? 'default' : 'none')}} id="abcText" value={abcValue} onChange={((e) => setAbcValue(e.currentTarget.value))}></TextField>
      <div id="player"></div>
      <div id="audio"></div>
    </Grid>
  );
});

export default TunePlayer;

