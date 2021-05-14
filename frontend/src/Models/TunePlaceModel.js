import { ModelService } from '../Services';
import { PersonModel } from '.';

export const TunePlaceModel = ModelService.GenerateDefaults({
    apiPath: 'tune-places',
    table: {
        label: 'place.place',
        fields: [
            { field: 'persons', headerName: 'person.name', selector: ['givenName' , 'surname']},
            { field: 'tunePlaceTypes', headerName: 'place.type', selector: 'title' },
            { field: 'parishes', headerName: 'place.parish', selector: 'title' },
            { field: 'municipalities', headerName: 'place.municipality', selector: 'title' },
            { field: 'villages', headerName: 'place.village', selector: 'title' },
            { field: 'otherPlace', headerName: 'place.other' },
            { field: 'remarks', headerName: 'tune.remarks' }
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'personId', type: 'dropdown', apiPath: PersonModel.apiPath, headerName: 'person.person', selector: ['givenName', 'surname']},
            { field: 'tunePlaceTypeId', type: 'dropdown', apiPath: 'tune-place-types', headerName: 'place.type' },
            { field: 'parishId', type: 'dropdown', apiPath: 'parishes', headerName: 'place.parish', selector: 'title' },
            { field: 'municipalityId', type: 'dropdown', apiPath: 'municipalities', headerName: 'place.municipality' },
            { field: 'villageId', type: 'dropdown', apiPath: 'villages', headerName: 'place.village', selector: 'title' },
            { field: 'otherPlace', headerName: 'place.other' },
            { field: 'remarks', headerName: 'tune.remarks' }

        ]
    }
});