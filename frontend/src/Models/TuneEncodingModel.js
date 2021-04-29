import modelParser from './ModelParser';

const TuneEncodingModel = modelParser({
    table: {
        label: 'encoding.encoding',
        fields: [
            { field: 'tuneEncodingNum', headerName: 'encoding.tuneEncodingNum'},
            { field: 'keySignatures', headerName: 'encoding.keySignatures', selector: 'title'},
            { field: 'supportSounds', headerName: 'encoding.supportSounds', selector: 'title'},
            { field: 'pitches', headerName: 'encoding.pitches', selector: 'title'},
            { field: 'measures', headerName: 'encoding.measures', selector: 'title'},
            { field: 'remarks', headerName: 'tune.remarks' }
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tempo', headerName: 'tune.tempo' },
        ]
    }
});

export default TuneEncodingModel;