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
            { field: 'id', headerName: 'tune.tuneId', width: 110 },
            { field: 'tuneReference', headerName: 'tune.tuneReference', width: 170 },
            { field: 'textReference', headerName: 'tune.textReference', width: 170 },
            { field: 'soundReference', headerName: 'tune.soundReference', width: 170 },
            { field: 'videoReference', headerName: 'tune.videoReference', width: 170 },
         ]
    },
    // This model is not used to generate the tune view, just to request data
    view: {
        label: 'tune.tune',
        fields: [
            { field: 'id', headerName: 'tune.tuneId' },
            { field: 'tuneReference', headerName: 'tune.tuneReference' },
            { field: 'soundReference', headerName: 'tune.soundReference' },
            { field: 'videoReference', headerName: 'tune.videoReference' },
            { field: 'textReference', headerName: 'tune.textReference' },
            { field: 'nations', headerName: 'tune.nation', selector: 'title' },
            { field: 'languages', headerName: 'tune.language', selector: 'title' },
            { field: 'countries', headerName: 'tune.country', selector: 'title' },
            { field: 'publications', headerName: 'tune.publications' },
            { field: 'catalogue', headerName: 'tune.catalogue' },
            { field: 'remarks', type: 'textbox', headerName: 'tune.remarks' },
            { field: 'users', headerName: 'tune.verifiedBy', selector: ['firstName', 'lastName'] },
            { field: 'verified', headerName: 'tune.verified' },
            { field: 'created', headerName: 'date.created' },
            { field: 'modified', headerName: 'date.modified' },
            {
                field: 'externalReferences',
                type: 'table',
                nested: ExternalReferenceModel.table
            },
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
                type: 'model',
                array: true,
                nested: TuneEncodingModel.view
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
            { field: 'id', hidden: true },
            { field: 'tuneReference', headerName: 'tune.tuneReference' },
            { field: 'soundReference', headerName: 'tune.soundReference' },
            { field: 'videoReference', headerName: 'tune.videoReference' },
            { field: 'textReference', headerName: 'tune.textReference' },
            { field: 'nationId', type: 'dropdown', apiPath: 'nations', headerName: 'tune.nation' },
            { field: 'languageId', type: 'dropdown', apiPath: 'languages', headerName: 'tune.language' },
            { field: 'countryId', type: 'dropdown', apiPath: 'countries', headerName: 'tune.country' },
            { field: 'remarks', type: 'textbox', headerName: 'tune.remarks' },
            { field: 'verifiedBy', type: 'dropdown', apiPath: 'users', headerName: 'tune.verifiedBy', title: ['firstName', 'lastName'], removeIfEmpty: true },
            { field: 'verified', type: 'view', timestamp: true, headerName: 'tune.verified' },
            { field: 'tuneStates', type: 'view', apiPath: 'tune-states', headerName: 'tune.state', selector: 'title' },
            { field: 'created', type: 'view', timestamp: true, headerName: 'date.created' },
            { field: 'modified', type: 'view', timestamp: true, headerName: 'date.modified' },
            {
                field: 'externalReferences',
                type: 'table',
                nested: ExternalReferenceModel.table,
                edit: ExternalReferenceModel.edit
            }, 
            {
                field: 'musicalCharacteristics',
                type: 'table',
                nested: MusicalCharacteristicsModel.table,
                edit: MusicalCharacteristicsModel.edit
            },
            {
                label: 'tune.encodings',
                field: 'tuneEncodings',
                type: 'model',
                array: true,
                nested: TuneEncodingModel.edit
            },
            {
                label: 'tune.transcriptions',
                field: 'tuneTranscriptions',
                type: 'model',
                array: true,
                nested: TuneTranscriptionModel.edit
            },
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
                field: 'tuneSongs',
                type: 'table',
                nested: TuneSongsModel.table,
                edit: TuneSongsModel.edit
            },
            {
                field: 'tunePerformances',
                type: 'table',
                nested: TunePerformancesModel.table,
                edit: TunePerformancesModel.edit
            },
            {
                type: 'label',
                value: 'tune.additionalReferences'
            },
            { field: 'catalogue', headerName: 'tune.catalogue' },
            { field: 'publications', headerName: 'tune.publications' },
        ]
    }
});