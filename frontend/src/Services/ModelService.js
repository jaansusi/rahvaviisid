export const ModelService = {
    GenerateDefaults(model) {
        // to-do: recursive model fixer
        let views = ['list', 'view', 'edit', 'table'];
        views.forEach(view => {
            if (model[view] !== undefined && model[view].apiPath === undefined) {
                model[view].apiPath = model.apiPath;
            }
        });

        return model;
    }
};