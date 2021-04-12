const mapResponseToModel = (data, model, setFormData) => {
    // Create a recursive function to model this object to react
    let setData = (data, currentModel, nested) => {
        let obj = {};
        currentModel.fields.forEach((modelElem) => {
            let fieldValue = undefined;
            if (data[modelElem.field] !== null)
                fieldValue = data[modelElem.field];
            else {
                // Recur with the child model
                if (modelElem.nested !== undefined)
                    fieldValue = setData(
                        data[modelElem.field],
                        modelElem.nested,
                        true
                    );
                // If the field has a defined type, act on it
                switch (modelElem.type) {
                    case 'array':
                        fieldValue =
                            fieldValue === undefined
                                ? []
                                : [fieldValue];
                        break;
                    default:
                        fieldValue =
                            fieldValue === undefined
                                ? ''
                                : fieldValue;
                        break;
                }
            }

            // If the function is not marked as nested, just set the value and be done with it
            if (!nested) {
                setFormData({
                    name: modelElem.field,
                    value: fieldValue,
                });
            }
            // Otherwise assign the nested value to the original field..
            obj[modelElem.field] = fieldValue;
        });

        // ..and return it to be assigned in the parent call
        return obj;
    };

    // Start the model mapping
    setData(data, model, false);
};

const createIncludeFilter = (model) => {
    let recursiveFun = (currentModel) => {
        return {
            include: currentModel.fields.filter(x => x.nested || x.selector).map((x) => {
                let obj = {
                    relation: x.field
                };
                if (x.nested)
                    obj.scope = recursiveFun(x.nested);
                return obj;
            })
        }
    };
    return recursiveFun(model);
}
export { mapResponseToModel, createIncludeFilter };