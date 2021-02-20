import abcjs from "abcjs";
import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useTranslation } from "react-i18next";


const TunePlayer = (({ formData, handleChange, editable }) => {
  const { t } = useTranslation('common');

  let [combinedData, setCombinedData] = useState('');
  editable = editable === undefined ? false : editable;

  useEffect(() => {
    setCombinedData(() => {
      let melodyLines = formData.tuneMelodies.melody.split('\n');
      let wordsLines = formData.tuneMelodies.words.split('\n');
      let melodyAndWords = melodyLines.map((melodyLine, i) => {
        return melodyLine + ((wordsLines[i] === undefined || wordsLines[i] === '') ? '' : '\nw: ' + wordsLines[i]);
      });
      return [
        formData.tuneMelodies.customInput === '' ? '' : formData.customInput,
        formData.alter === '' ? '' : ('K: ' + formData.alter),
        formData.tempo === '' ? '' : ('Q: ' + formData.tempo),
        formData.title === '' ? '' : ('T: ' + formData.title),
        formData.noteLength === '' ? '' : ('L: ' + formData.noteLength),
        formData.reference === '' ? '' : ('X: ' + formData.reference),
        formData.author === '' ? '' : ('Z: ' + formData.author),
      ].concat(melodyAndWords).filter((elem) => elem !== '').join('\n');
    });
    let visualObj = abcjs.renderAbc('player', combinedData)[0];
    let synthControl = new abcjs.synth.SynthController();
    synthControl.load("#audio", null, { displayRestart: true, displayPlay: true, displayProgress: true });
    synthControl.setTune(visualObj, false);
  }, [formData, combinedData]);

  return (
    <Grid item xs={12}>
      <Grid
        container
        style={{ display: (editable ? 'default' : 'none') }}
        direction='row'
      >
        {/* <Grid item xs={4} className='form-edit-item'>
          <TextField name='clef' label={t('tune.clef')} value={formData['clef']} onChange={handleChange} variant='outlined' />
        </Grid> */}
        <Grid item xs={4} className='form-edit-item'>
          <TextField name='alter' label={t('tune.alter')} value={formData['alter']} onChange={handleChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='tempo' label={t('tune.tempo')} value={formData['tempo']} onChange={handleChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='noteLength' label={t('tune.noteLength')} value={formData['noteLength']} onChange={handleChange} variant='outlined' />
        </Grid>
        <Grid item xs={4} className='form-edit-item'>
          <TextField name='title' label={t('tune.title')} value={formData['title']} onChange={handleChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='author' label={t('tune.author')} value={formData['author']} onChange={handleChange} variant='outlined' />
        </Grid>

        <Grid item xs={4} className='form-edit-item'>
          <TextField name='reference' label={t('tune.reference')} value={formData['reference']} onChange={handleChange} variant='outlined' />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ display: (editable ? 'default' : 'none') }}
        direction='column'
      >
        <Grid item xs={12} className='form-edit-item'>
          <TextField name='customInput' label={t('tune.customInput')} value={formData['customInput']} onChange={handleChange} multiline fullWidth rows='2' variant='outlined' />
        </Grid>
        <Grid item xs={12} className='form-edit-item'>
          <TextField name='melody' label={t('tune.melody')} value={formData['melody']} onChange={handleChange} multiline fullWidth rows='2' variant='outlined' />
        </Grid>
        <Grid item xs={12} className='form-edit-item'>
          <TextField name='words' label={t('tune.words')} value={formData['words']} onChange={handleChange} multiline fullWidth rows='2' variant='outlined' />
        </Grid>
        <Grid item xs={12} className='form-edit-item'>
          <TextField label='debug' value={combinedData} multiline fullWidth rows='10' variant='outlined' />
        </Grid>
      </Grid>
      <div id="player"></div>
      <div style={{ display: (formData.melody === undefined ? 'none' : 'default') }} id="audio"></div>
    </Grid>
  );
});

export default TunePlayer;

