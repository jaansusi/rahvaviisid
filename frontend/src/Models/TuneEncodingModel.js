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
            { field: 'remarks', headerName: 'tune.remarks' }

        ]
    },
    view: {
        label: 'encoding.encoding',
        fields: [
            { field: 'keySignatures', headerName: 'encoding.keySignature', selector: 'title'},
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
            { field: 'keySignatureId', type: 'dropdown', apiPath: 'key-signatures', headerName: 'encoding.keySignature', selector: 'title'},
            { field: 'supportSoundId', type: 'dropdown', apiPath: 'support-sounds', headerName: 'encoding.supportSound', selector: 'title'},
            { field: 'pitchId', type: 'dropdown', apiPath: 'pitches', headerName: 'encoding.pitch', selector: 'title'},
            { field: 'measureId', type: 'dropdown', apiPath: 'measures', headerName: 'encoding.measure', selector: 'title'},
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'remarks', headerName: 'tune.remarks' },
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