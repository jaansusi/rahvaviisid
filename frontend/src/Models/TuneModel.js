import modelParser from './ModelParser';
import TunePlaceModel from './TunePlaceModel';
import TuneEncodingModel from './TuneEncodingModel';
import TuneTranscriptionModel from './TuneTransciptionModel';
import TunePerformancesModel from './TunePerformancesModel';
import TunePersonsModel from './TunePersonsModel';
import TuneSongsModel from './TuneSongsModel';
import ExternalReferenceModel from './ExternalReferenceModel';

const TuneModel = modelParser({
    apiPath: 'tunes',
    list: {
        fields: [
            { field: 'tuneReference', headerName: 'tune.tuneReference', width: 170 },
            { field: 'textReference', headerName: 'tune.textReference', width: 170 },
            { field: 'soundReference', headerName: 'tune.soundReference', width: 170 },
            { field: 'videoReference', headerName: 'tune.videoReference', width: 170 },
            { field: 'catalogue', headerName: 'tune.catalogue', width: 170 },
            { field: 'nations', headerName: 'tune.nation', selector: 'title', width: 170 },
            { field: 'languages', headerName: 'tune.language', selector: 'title', width: 100 },
            { field: 'countries', headerName: 'tune.country', selector: 'title', width: 100 }
        ]
    },
    view: {
        label: 'tune.tune',
        fields: [
            { field: 'id', hidden: true, headerName: 'common.id' },
            { field: 'tuneReference', headerName: 'tune.tuneReference' },
            { field: 'nations', headerName: 'tune.nation', selector: 'title' },
            { field: 'textReference', headerName: 'tune.textReference' },
            { field: 'languages', headerName: 'tune.language', selector: 'title' },
            { field: 'soundReference', headerName: 'tune.soundReference' },
            { field: 'countries', headerName: 'tune.country', selector: 'title' },
            { field: 'videoReference', headerName: 'tune.videoReference' },
            { field: 'publications', headerName: 'tune.publications' },
            { field: 'catalogue', headerName: 'tune.catalogue' },
            { field: 'remarks', headerName: 'tune.remarks' },
            { field: 'verifiedBy', headerName: 'tune.verifiedBy' },
            { field: 'verified', headerName: 'tune.verified' },
            {
                field: 'tunePlaces',
                type: 'table',
                nested: TunePlaceModel.table
            },
            {
                field: 'externalReferences',
                type: 'table',
                nested: ExternalReferenceModel.table
            },
            {
                field: 'tuneEncodings',
                type: 'table',
                nested: TuneEncodingModel.table
            },
            {
                field: 'tuneTranscriptions',
                type: 'model',
                array: true,
                nested: TuneTranscriptionModel.view
            },
            {
                field: 'tunesPersonsRoles',
                type: 'table',
                nested: TunePersonsModel.table
            },
            {
                field: 'tunePerformances',
                type: 'table',
                nested: TunePerformancesModel.table
            },
            {
                field: 'tuneSongs',
                type: 'table',
                nested: TuneSongsModel.table
            },


        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tuneStateId', type: 'dropdown', apiPath: 'tune-states', headerName: 'tune.state' },
            { field: 'textReference', headerName: 'tune.textReference' },
            { field: 'tuneReference', headerName: 'tune.tuneReference' },
            { field: 'soundReference', headerName: 'tune.soundReference' },
            { field: 'videoReference', headerName: 'tune.videoReference' },
            { field: 'catalogue', headerName: 'tune.catalogue' },
            { field: 'supportSound', headerName: 'tune.supportSound' },
            { field: 'height', headerName: 'tune.height' },
            { field: 'bar', headerName: 'tune.bar' },
            { field: 'clef', headerName: 'tune.clef' },
            { field: 'nationId', type: 'dropdown', apiPath: 'nations', headerName: 'tune.nation' },
            { field: 'languageId', type: 'dropdown', apiPath: 'languages', headerName: 'tune.language' },
            { field: 'countryId', type: 'dropdown', apiPath: 'countries', headerName: 'tune.country' },
            { field: 'publications', headerName: 'tune.publications' },
            { field: 'remarks', headerName: 'tune.remarks' },
            { field: 'verifiedBy', type: 'number', headerName: 'tune.verifiedBy' },
            { field: 'verified', headerName: 'date.verified' },
            { field: 'created', type: 'view', headerName: 'date.created' },
            { field: 'modified', type: 'view', headerName: 'date.modified' },
            {
                field: 'tunePlaces',
                type: 'table',
                nested: TunePlaceModel.table,
                edit: TunePlaceModel.edit
            },
            {
                field: 'tuneEncodings',
                type: 'table',
                nested: TuneEncodingModel.table,
                edit: TuneEncodingModel.edit
            },
            {
                field: 'tuneTranscriptions',
                type: 'model',
                array: true,
                nested: TuneTranscriptionModel.view
            },
            {
                field: 'tunesPersonsRoles',
                type: 'table',
                nested: TunePersonsModel.table,
                edit: TunePersonsModel.edit
            },
            {
                field: 'tunePerformances',
                type: 'table',
                nested: TunePerformancesModel.table,
                edit: TunePerformancesModel.edit
            },
            {
                field: 'tuneSongs',
                type: 'table',
                nested: TuneSongsModel.table,
                edit: TuneSongsModel.edit
            },
        ]
    }
});

export default TuneModel;