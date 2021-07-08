import { ModelService } from '../Services';

export const UserModel = ModelService.GenerateDefaults({
    apiPath: 'users',
    list: {
        fields: [
            { field: 'email', headerName: 'user.email', width: 200 },
            { field: 'firstName', headerName: 'user.firstName', width: 140 },
            { field: 'lastName', headerName: 'user.roles', width: 150 },
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
            { field: 'isActive', type: 'boolean', headerName: 'common.active'},
            {
                field: 'roles', type: 'multiselect', apiPath: 'users', headerName: 'user.role', values: [
                    { title: 'Kasutaja', value: 'user' },
                    { title: 'Toimetaja', value: 'editor' },
                    { title: 'Administraator', value: 'admin' }
                ]
            }
        ]
    },
    create: {
        apiPath: 'users',
        fields: [
            { field: 'email', headerName: 'user.email' },
            { field: 'password', headerName: 'user.password' },
            { field: 'firstName', headerName: 'user.firstName' },
            { field: 'lastName', headerName: 'user.lastName' },
            {
                field: 'roles', type: 'multiselect', apiPath: 'users', headerName: 'user.role', values: [
                    { title: 'Kasutaja', value: 'user' },
                    { title: 'Toimetaja', value: 'editor' },
                    { title: 'Administraator', value: 'admin' }
                ]
            }
        ]
    }
});