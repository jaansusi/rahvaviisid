//to-do move into services
const createEmptyDataObject = (currentModel) => {
    let arr = currentModel.map((elem) => [
        elem.field,
        // Run an IIFE since we don't need a defined function here and a one-liner would be too confusing
        (() => {
            let value = undefined;
            // If a value should be nested, let's recurse into the nested model
            console.log(elem);
            if (elem.selector !== undefined)
                value = {};
            if (elem.nested !== undefined)
                value = createEmptyDataObject(elem.nested.fields);
            if (elem.edit !== undefined)
                value = createEmptyDataObject(elem.edit.fields);

            // If the model field has a type defined, assign it here.
            switch (elem.type) {
                case 'boolean':
                    value = true;
                    break;
                case 'table':
                    value = [];
                    break;
                default:
                    value = value === undefined ? '' : value;
            }
            // If the field should be an array, let's make it into one
            if (elem.array)
                value = [value]
            return value;
        })(),
    ]);
    let model = new Map(arr);
    return Object.fromEntries(model);
};


export { createEmptyDataObject };