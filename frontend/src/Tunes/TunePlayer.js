import abcjs from "abcjs";
import React, { useEffect, useState, useReducer } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useTranslation } from "react-i18next";


const TunePlayer = (({ data, onChange, editable }) => {
  const { t } = useTranslation('common');
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
  };
  let [tuneData, setTuneData] = useReducer(formReducer, {
    customInput: '',
    alter: '',
    tempo: '',
    title: '',
    clef: '',
    noteLength: '',
    reference: '',
    author: '',
    melody: '',
    words: ''
  });
  const handleTuneChange = event => {
    const { name, value, type } = event.target;
    setTuneData({
      name: name,
      value: type === 'number' ? parseInt(value, 10) : value,
    });
  };


  let [combinedData, setCombinedData] = useState('');
  editable = editable === undefined ? false : editable;

  useEffect(() => {
    setCombinedData(() => {
      let melodyLines = tuneData.melody.split('\n');
      let wordsLines = tuneData.words.split('\n');
      let melodyAndWords = melodyLines.map((melodyLine, i) => {
        return melodyLine + ((wordsLines[i] === undefined || wordsLines[i] === '') ? '' : '\nw: ' + wordsLines[i]);
      });
      return [
        tuneData.customInput === '' ? '' : tuneData.customInput,
        tuneData.alter === '' ? '' : ('K: ' + tuneData.alter),
        tuneData.tempo === '' ? '' : ('Q: ' + tuneData.tempo),
        tuneData.title === '' ? '' : ('T: ' + tuneData.title),
        tuneData.noteLength === '' ? '' : ('L: ' + tuneData.noteLength),
        tuneData.reference === '' ? '' : ('X: ' + tuneData.reference),
        tuneData.author === '' ? '' : ('Z: ' + tuneData.author),
      ].concat(melodyAndWords).filter((elem) => elem !== '').join('\n');
    });
    let visualObj = abcjs.renderAbc('player', combinedData)[0];
    let synthControl = new abcjs.synth.SynthController();
    synthControl.load("#audio", null, { displayRestart: true, displayPlay: true, displayProgress: true });
    synthControl.setTune(visualObj, false);
  }, [tuneData, combinedData]);

  useEffect(() => {
    for (let prop in data) {
      setTuneData({
        name: prop,
        value: data[prop],
      });
    }
  }, [data]);

  useEffect(() => {
    if (!Object.values(data).map(el => el === '').every(el => el)) {
      // onChange({
      //   target: {
      //     name: 'tuneMelodies',
      //     value: tuneData,
      //     type: 'object'
      //   }
      // });
    }
  }, [tuneData]);

  return (
    <Grid item xs={12}>
      <Grid
        container
        style={{ display: (editable ? 'default' : 'none') }}
        direction='row'
      >
        {/* <Grid item xs={4} className='form-edit-item'>
          <TextField name='clef' label={t('tune.clef')} value={tuneData['clef']} onChange={handleTuneChange} variant='outlined' />
        </Grid> */}
        <Grid item xs={4} className='form-edit-item'>
          <TextField name='alter' label={t('tune.alter')} value={tuneData['alter']} onChange={handleTuneChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='tempo' label={t('tune.tempo')} value={tuneData['tempo']} onChange={handleTuneChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='noteLength' label={t('tune.noteLength')} value={tuneData['noteLength']} onChange={handleTuneChange} variant='outlined' />
        </Grid>
        <Grid item xs={4} className='form-edit-item'>
          <TextField name='title' label={t('tune.title')} value={tuneData['title']} onChange={handleTuneChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='author' label={t('tune.author')} value={tuneData['author']} onChange={handleTuneChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='reference' label={t('tune.reference')} value={tuneData['reference']} onChange={handleTuneChange} variant='outlined' />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ display: (editable ? 'default' : 'none') }}
        direction='column'
      >
        <Grid item xs={12} className='form-edit-item'>
          <TextField name='customInput' label={t('tune.customInput')} value={tuneData['customInput']} onChange={handleTuneChange} multiline fullWidth rows='2' variant='outlined' />
        </Grid>
        <Grid item xs={12} className='form-edit-item'>
          <TextField name='melody' label={t('tune.melody')} value={tuneData['melody']} onChange={handleTuneChange} multiline fullWidth rows='2' variant='outlined' />
        </Grid>
        <Grid item xs={12} className='form-edit-item'>
          <TextField name='words' label={t('tune.words')} value={tuneData['words']} onChange={handleTuneChange} multiline fullWidth rows='2' variant='outlined' />
        </Grid>
        <Grid item xs={12} className='form-edit-item'>
          <TextField label='debug' value={combinedData} multiline fullWidth rows='10' variant='outlined' />
        </Grid>
      </Grid>
      <div id="player"></div>
      <div style={{ display: (tuneData.melody === undefined ? 'none' : 'default') }} id="audio"></div>
    </Grid>
  );
});

export default TunePlayer;

