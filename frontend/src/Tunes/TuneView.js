import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';
import { DataService } from '../Services';
import { TuneModel } from '../Models';

const TuneView = () => {
    let { id } = useParams();
    let [assetData, setAssetData] = useState(undefined);
    DataService.RequestAsset(TuneModel.view, id, setAssetData);
    return (
        <Grid
            item xs={9}>
                {JSON.stringify(assetData)}
        </Grid>
    );
};

export default TuneView;