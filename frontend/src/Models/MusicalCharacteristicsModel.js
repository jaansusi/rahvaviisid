import { ModelService } from '../Services';

export const MusicalCharacteristicsModel = ModelService.GenerateDefaults({
    apiPath: 'musical-characteristics',
    table: {
        label: 'musical.label',
        fields: [
            { field: 'soundRanges', headerName: 'musical.soundRange', width: 140 , selector: 'title'},
            { field: null, headerName: 'musical.tuneForm', width: 140 },
            { field: null, headerName: 'musical.textForm', width: 140 },
            { field: null, headerName: 'musical.rhythmType', width: 140 },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', type: 'boolean', headerName: 'musical.isVariable', width: 150 }
        ]
    },
    view: {
        fields: [
            { field: 'soundRanges', headerName: 'musical.soundRange', width: 140, selector: 'title' },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', headerName: 'common.remarks', width: 120 }
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'soundRanges', headerName: 'musical.soundRange', width: 140 , selector: 'title'},
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', type: 'boolean', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks', width: 120 }
        ]
    }
});