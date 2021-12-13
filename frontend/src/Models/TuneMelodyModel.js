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
            { field: 'author', headerName: 'tune.author' },
            { field: 'remarks', headerName: 'tune.description' },
            { type: 'player', headerName: 'tune.player' }
        ]
    },
    edit: {
        label: 'tune.variant',
        fields: [
            { field: 'id', hidden: true },
            { field: 'variationIndex', type: 'number', hidden: true },
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'noteLength', headerName: 'tune.noteLength' },
            { field: 'author', headerName: 'tune.author' },
            { field: 'melody', type: 'textbox', headerName: 'tune.melody' },
            { field: 'words', type: 'textbox', headerName: 'tune.words' },
            { field: 'remarks', type: 'textbox', headerName: 'tune.description' },
            { field: 'customInput', type: 'textbox', headerName: 'tune.customInput' },
            { field: 'combinedData', type: 'player', headerName: 'tune.player' }

        ]
    }
});