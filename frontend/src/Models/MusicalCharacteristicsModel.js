import { ModelService } from '../Services';

export const MusicalCharacteristicsModel = ModelService.GenerateDefaults({
    apiPath: 'musical-characteristics',
    table: {
        fields: [
            { field: 'tuneId', headerName: 'musical.tune', width: 170 },
            { 
                field: 'soundRangeId', 
                headerName: 'musical.soundRange', 
                width: 140 },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', headerName: 'common.remarks', width: 120 }
        ]
    },
    view: {
        fields: [
            { field: 'tuneId', headerName: 'musical.tune', width: 170 },
            { field: 'soundRangeId', headerName: 'musical.soundRange', width: 140 },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', headerName: 'common.remarks', width: 120 }
        ]
    },
    edit: {
        fields: [
            { field: 'tuneId', headerName: 'musical.tune', width: 170 },
            { field: 'soundRangeId', headerName: 'musical.soundRange', width: 140 },
            { field: 'melostropheNumScore', headerName: 'musical.score', width: 140 },
            { field: 'melostropheNumAudio', headerName: 'musical.audio', width: 150 },
            { field: 'isVariable', headerName: 'musical.isVariable', width: 150 },
            { field: 'remarks', headerName: 'common.remarks', width: 120 }
        ]
    }
});