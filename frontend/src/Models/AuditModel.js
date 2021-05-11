import { ModelService } from '../Services';

export const AuditModel = ModelService.GenerateDefaults({
    apiPath: 'audit-logs',
    list: {
        fields: [
            { field: 'action', headerName: 'audit.action', width: 170 },
            { field: 'actedAt', headerName: 'audit.actedAt', width: 280 },
            { field: 'actor', headerName: 'audit.actor', width: 150 },
            { field: 'before', headerName: 'audit.before', width: 600 },
            { field: 'after', headerName: 'audit.after', width: 600 }
        ]
    },
    view: {
        fields: [
            { field: 'action', headerName: 'audit.action' },
            { field: 'actedAt', headerName: 'audit.actedAt' },
            { field: 'actor', headerName: 'audit.actor' },
        ]
    }
});