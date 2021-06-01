import { ModelService } from '../Services';

export const UserModel = ModelService.GenerateDefaults({
    apiPath: 'users',
    list: {
        fields: [
            { field: 'email', headerName: 'user.email', width: 200 },
            { field: 'firstName', headerName: 'user.firstName', width: 140 },
            { field: 'lastName', headerName: 'user.lastName', width: 150 },
        ]
    },
    view: {
        fields: [
            { field: 'email', headerName: 'user.email' },
            { field: 'firstName', headerName: 'user.firstName' },
            { field: 'lastName', headerName: 'user.lastName' },
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'email', headerName: 'user.email' },
            { field: 'firstName', headerName: 'user.firstName' },
            { field: 'lastName', headerName: 'user.lastName' },
            { field: null, type: 'dropdown', apiPath: 'users', headerName: 'user.role' }
        ]
    }
});