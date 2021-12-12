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
            { field: 'email', headerName: 'user.email', required: true },
            { field: 'firstName', headerName: 'user.firstName' },
            { field: 'lastName', headerName: 'user.lastName' },
            { field: 'isActive', type: 'boolean', headerName: 'common.active'},
            {
                field: 'roles', type: 'staticMultiselect', headerName: 'user.role', values: [
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
            { field: 'email', headerName: 'user.email', required: true },
            { field: 'password', headerName: 'user.password', required: true, pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{14,})" },
            { field: 'firstName', headerName: 'user.firstName' },
            { field: 'lastName', headerName: 'user.lastName' },
            { field: 'isActive', type: 'boolean', headerName: 'common.active'},
            {
                field: 'roles', type: 'staticMultiselect', headerName: 'user.role', values: [
                    { title: 'Kasutaja', value: 'user' },
                    { title: 'Toimetaja', value: 'editor' },
                    { title: 'Administraator', value: 'admin' }
                ]
            }
        ]
    }
});