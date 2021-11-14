import { ModelService } from '../Services';
import { TuneMelodyModel } from './TuneMelodyModel';

export const TuneEncodingModel = ModelService.GenerateDefaults({
    table: {
        label: 'encoding.encoding',
        fields: [
            { field: 'rhythmType', headerName: 'encoding.rhythmType'},
            { field: 'keySignatures', headerName: 'encoding.keySignature', selector: 'title'},
            { field: 'supportSounds', headerName: 'encoding.supportSound', selector: 'title'},
            { field: 'pitches', headerName: 'encoding.pitch', selector: 'title'},
            { field: 'measures', headerName: 'encoding.measure', selector: 'title'},
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'remarks', type: 'textbox', headerName: 'tune.remarks' }

        ]
    },
    view: {
        label: 'encoding.encoding',
        fields: [
            { field: 'keySignatures', headerName: 'encoding.keySignature', selector: 'title' },
            { field: 'supportSounds', headerName: 'encoding.supportSound', selector: 'title'},
            { field: 'pitches', headerName: 'encoding.pitch', selector: 'title'},
            { field: 'measures', headerName: 'encoding.measure', selector: 'title'},
            {
                field: 'tuneMelodies',
                type: 'model',
                array: true,
                sortBy: 'variationIndex',
                nested: TuneMelodyModel.view
            }
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },            
            { field: 'rhythmType', headerName: 'encoding.rhythmType'},
            { field: 'keySignatureId', type: 'dropdown', apiPath: 'key-signatures', headerName: 'encoding.keySignature', title: 'title'},
            { field: 'supportSoundId', type: 'dropdown', apiPath: 'support-sounds', headerName: 'encoding.supportSound', title: 'title'},
            { field: 'pitchId', type: 'dropdown', apiPath: 'pitches', headerName: 'encoding.pitch', title: 'title'},
            { field: 'measureId', type: 'dropdown', apiPath: 'measures', headerName: 'encoding.measure', title: 'title'},
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'remarks', type: 'textbox', headerName: 'tune.remarks' },
            {
                field: 'tuneMelodies',
                type: 'model',
                array: true,
                sortBy: 'variationIndex',
                nested: TuneMelodyModel.edit
            }
        ]
    }
});