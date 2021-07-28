import { ModelService } from '../Services';

export const TuneMelodyModel = ModelService.GenerateDefaults({
    apiPath: 'tune-melodies',
    view: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'height', headerName: 'tune.height' },
            { field: 'bar', headerName: 'tune.bar' },
            { field: 'clef', headerName: 'tune.clef' },
            { type: 'player', headerName: 'tune.player' }
        ]
    },
    edit: {
        label: 'tune.variant',
        fields: [
            { field: 'id', hidden: true },
            { field: 'variationIndex', hidden: true },
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'noteLength', headerName: 'tune.noteLength' },
            { field: 'melody', type: 'textbox', headerName: 'tune.melody' },
            { field: 'words', type: 'textbox', headerName: 'tune.words' },
            { field: 'customInput', type: 'textbox', headerName: 'tune.customInput' },
            { field: 'combinedData', type: 'player', headerName: 'tune.player' }

        ]
    }
});