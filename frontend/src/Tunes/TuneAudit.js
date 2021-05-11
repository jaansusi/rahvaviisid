import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuditModel } from '../Models';
import axios from 'axios';
import config from '../config';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';

const TuneEdit = () => {
    const { t } = useTranslation('common');
    let { id } = useParams();
    let [logs, setLogs] = useState([]);
    let columns = AuditModel.list.fields.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    useEffect(() => {
        axios.get(config.apiUrl + '/' + AuditModel.apiPath + '?filter=' + JSON.stringify({'where': {'entityId': id}}))
            .then(
                (result) => {
                    setLogs(result.data.map((x => {
                        x.before = JSON.stringify(x.before);
                        x.after = JSON.stringify(x.after);
                        return x
                    })));
                }
            );
        // DataService.RequestAsset(AuditModel.view, id, setAssetData);
    }, [id]);
    return (
        <div style={{width: '90vw', height: '500px'}}>
            <DataGrid
                columns={columns}
                rows={logs}
            />
        </div>
    );
};

export default TuneEdit;