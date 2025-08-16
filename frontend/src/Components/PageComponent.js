import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { AuthService } from '../Services';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const PageComponent = ({ name }) => {
    const { t } = useTranslation('common');

    let [editing, setEditing] = useState(false);
    let [page, setPage] = useState(null);
    let [content, setContent] = useState('');

    const patchPage = () => {
        let tempPage = page;
        tempPage.content = content;
        axios.patch(config.apiUrl + '/pages/' + page.id, tempPage)
            .then((data) => {
                setEditing(false);
            });
    }

    useEffect(() => {
        axios
            .get(config.apiUrl + '/pages?filter=' + JSON.stringify({ where: { 'name': name } }))
            .then((result) => {
                let response = result.data[0];
                if (response) {
                    setPage(response);
                    setContent(response.content);
                }
                    
            });
    }, [name]);
    return (
        <Grid item xs={8}>
            {
                AuthService.CanAccess(['admin']) && !editing &&
                <Button variant='outlined' onClick={() => setEditing(!editing)}>{t('action.edit')}</Button>
            }
            {
                editing ?
                    <Grid>
                        <Button onClick={() => patchPage()} variant='outlined'>{t('action.save')}</Button>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                        />
                    </Grid>
                    :
                    <Grid dangerouslySetInnerHTML={{__html: content}}>

                    </Grid>
            }
        </Grid>
    );
};

export default PageComponent;