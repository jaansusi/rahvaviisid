import { ModelService } from '../Services';

export const TuneMelodyModel = ModelService.GenerateDefaults({
    apiPath: 'tune-melodies',
    view: {
        fields: [
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'height', headerName: 'tune.height' },
            { field: 'bar', headerName: 'tune.bar' },
            { field: 'clef', headerName: 'tune.clef' },
            { field: 'rhythmType', hidden: true, headerName: 'tune.rhythmType' },
            { field: 'noteLength', hidden: true, headerName: 'tune.noteLength' },
            { field: 'melody', hidden: true, type: 'textbox', headerName: 'tune.melody' },
            { field: 'words', hidden: true, type: 'textbox', headerName: 'tune.words' },
            { field: 'customInput', hidden: true, type: 'textbox', headerName: 'tune.customInput' },
            { field: 'variationIndex', hidden: true },
            { type: 'player', headerName: 'tune.player' }
        ]
    },
    edit: {
        label: 'tune.melody',
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'height', headerName: 'tune.height' },
            { field: 'bar', headerName: 'tune.bar' },
            { field: 'clef', headerName: 'tune.clef' },
            { field: 'rhythmType', headerName: 'tune.rhythmType' },
            { field: 'noteLength', headerName: 'tune.noteLength' },
            { field: 'melody', type: 'textbox', headerName: 'tune.melody' },
            { field: 'words', type: 'textbox', headerName: 'tune.words' },
            { field: 'customInput', type: 'textbox', headerName: 'tune.customInput' },
            { field: 'variationIndex', hidden: true },
            { type: 'player', headerName: 'tune.player' }

        ]
    }
});