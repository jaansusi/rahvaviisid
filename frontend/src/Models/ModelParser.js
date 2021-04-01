const modelParser = (model) => {
    // to-do: recursive model fixer
    let views = ['list', 'view', 'edit'];
    views.forEach(view => {
        if (model[view] !== undefined && model[view].apiPath === undefined) {
            model[view].apiPath = model.apiPath;
        }
    });

    return model;
};

export default modelParser;