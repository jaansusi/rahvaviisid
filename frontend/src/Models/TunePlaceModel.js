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
            { field: 'personId', type: 'dropdown', apiPath: PersonModel.apiPath, headerName: 'person.person'},
            { field: 'tunePlaceTypes', headerName: 'place.type', selector: 'title' },
            { field: 'parishes', headerName: 'place.parish', selector: 'title' },
            { field: 'municipalities', headerName: 'place.municipality', selector: 'title' },
            { field: 'villages', headerName: 'place.village', selector: 'title' },
            { field: 'otherPlace', headerName: 'place.other' },
            { field: 'remarks', headerName: 'tune.remarks' }

        ]
    }
});