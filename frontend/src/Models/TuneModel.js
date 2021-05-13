import { ModelService } from '../Services';
import { ExternalReferenceModel } from './ExternalReferenceModel';
import { MusicalCharacteristicsModel } from './MusicalCharacteristicsModel';
import { TuneEncodingModel } from './TuneEncodingModel';
import { TunePerformancesModel } from './TunePerformancesModel';
import { TunePersonsModel } from './TunePersonsModel';
import { TunePlaceModel } from './TunePlaceModel';
import { TuneSongsModel } from './TuneSongsModel';
import { TuneTranscriptionModel } from './TuneTransciptionModel';

export const TuneModel = ModelService.GenerateDefaults({
    apiPath: 'tunes',
    list: {
        fields: [
            { field: 'id', headerName: 'common.pid', width: 80 },
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
            { field: 'id', headerName: 'common.id' },
            { field: 'tuneReference', headerName: 'tune.tuneReference' },
            { field: 'textReference', headerName: 'tune.textReference' },
            { field: 'soundReference', headerName: 'tune.soundReference' },
            { field: 'videoReference', headerName: 'tune.videoReference' },
            { field: 'nations', headerName: 'tune.nation', selector: 'title' },
            { field: 'languages', headerName: 'tune.language', selector: 'title' },
            { field: 'countries', headerName: 'tune.country', selector: 'title' },
            { field: 'publications', headerName: 'tune.publications' },
            { field: 'catalogue', headerName: 'tune.catalogue' },
            { field: 'remarks', headerName: 'tune.remarks' },
            { field: 'verifiedBy', headerName: 'tune.verifiedBy' },
            { field: 'verified', headerName: 'tune.verified' },
            { field: 'created', headerName: 'date.created' },
            { field: 'modified', headerName: 'date.modified' },
            {
                field: 'tunesPersonsRoles',
                type: 'table',
                nested: TunePersonsModel.table
            },
            {
                field: 'tunePlaces',
                type: 'table',
                nested: TunePlaceModel.table
            },
            {
                field: 'tunePerformances',
                type: 'table',
                nested: TunePerformancesModel.table
            },
            {
                field: 'externalReferences',
                type: 'table',
                nested: ExternalReferenceModel.table
            },
            {
                field: 'tuneTranscriptions',
                type: 'model',
                array: true,
                nested: TuneTranscriptionModel.view
            },
            {
                field: 'tuneSongs',
                type: 'table',
                nested: TuneSongsModel.table
            },
            {
                field: 'tuneEncodings',
                type: 'table',
                nested: TuneEncodingModel.table
            },
            {
                field: 'musicalCharacteristics',
                type: 'table',
                nested: MusicalCharacteristicsModel.table,
                edit: MusicalCharacteristicsModel.edit
            },
        ]
    },
    edit: {
        fields: [
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
            { field: 'verifiedBy', type: 'dropdown', apiPath: 'users', headerName: 'tune.verifiedBy', title: 'username' },
            { field: 'verified', headerName: 'date.verified' },
            { field: 'created', type: 'view', headerName: 'date.created' },
            { field: 'modified', type: 'view', headerName: 'date.modified' },
            {
                field: 'tunesPersonsRoles',
                type: 'table',
                nested: TunePersonsModel.table,
                edit: TunePersonsModel.edit
            },
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
                nested: TuneTranscriptionModel.edit
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
            {
                field: 'musicalCharacteristics',
                type: 'table',
                nested: MusicalCharacteristicsModel.table,
                edit: MusicalCharacteristicsModel.edit
            },
        ]
    }
});