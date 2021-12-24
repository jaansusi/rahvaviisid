import { ModelService } from '../Services';

export const MusicalCharacteristicsModel = ModelService.GenerateDefaults({
    apiPath: 'musical-characteristics',
    table: {
        label: 'musical.label',
        singleAsset: true,
        fields: [
            { field: 'soundRanges', headerName: 'musical.soundRange', width: 140, selector: 'title'},
            { field: 'tuneForms', headerName: 'musical.tuneForm', width: 140, selector: 'title', alt: 'description' },
            { field: 'textForms', headerName: 'musical.textForm', width: 140, selector: 'title' },
            { field: 'rhythmTypes', headerName: 'musical.rhythmType', width: 140, selector: 'title' },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', type: 'boolean', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks' }
        ]
    },
    view: {
        fields: [
            { field: 'soundRanges', headerName: 'musical.soundRange', width: 140, selector: 'title' },
            { field: 'tuneForms', selector: 'title', headerName: 'musical.tuneForm' },
            { field: 'textForms', selector: 'title', headerName: 'musical.textForm' },
            { field: 'rhythmTypes', selector: 'title', headerName: 'musical.rhythmType' },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks', width: 120 }
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'soundRangeId', type: 'dropdown', apiPath: 'sound-ranges', headerName: 'musical.soundRange' },
            { field: 'tuneForms', type: 'multiselect', apiPath: 'tune-forms', selector: 'id', headerName: 'musical.tuneForm' },
            { field: 'textForms', type: 'multiselect', apiPath: 'text-forms', selector: 'id', headerName: 'musical.textForm' },
            { field: 'rhythmTypes', type: 'multiselect', apiPath: 'rhythm-types', selector: 'id', headerName: 'musical.rhythmType' },
            { field: 'melostropheNumScore', headerName: 'musical.score' },
            { field: 'melostropheNumAudio', headerName: 'musical.audio' },
            { field: 'isVariable', type: 'boolean', headerName: 'musical.isVariable' },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks' }
        ]
    }
});