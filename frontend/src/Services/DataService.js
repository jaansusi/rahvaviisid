import axios from "axios";
import config from "../config";

export const DataService = {
    RequestAsset(model, id) {
        return axios
            .get(config.apiUrl + '/' + model.apiPath + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(this.CreateIncludeFilter(model))))
            .then((result) => this.MapResponseToModel(result.data, model));
    },

    MapResponseToModel(data, model) {
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

                obj[modelElem.field] = fieldValue;
            });

            // ..and return it to be assigned in the parent call
            return obj;
        };

        // Start the model mapping
        return setData(data, model, false);
    },

    CreateIncludeFilter(model) {
        let recursiveFun = (currentModel) => {
            let nestedFields = currentModel.fields.filter(x =>
                x.nested ||
                (x.selector && x.type !== 'dropdown') ||
                (x.type === 'multiselect' && x.apiPath) ||
                x.associatedModel
            );
            if (nestedFields.length === 0)
                return {}
            return {
                include: nestedFields.map((x) => {
                    let obj = {
                        relation: x.field
                    };
                    if (x.nested)
                        obj.scope = recursiveFun(x.nested);
                    if (x.associatedModel)
                        obj.scope = recursiveFun(x.associatedModel);
                    return obj;
                })
            }
        };
        return recursiveFun(model);
    },
    CreateEmptyDataObject(currentModel) {
        return new Promise(resolve => resolve(this.SyncCreateEmptyDataObject(currentModel)));
    },
    SyncCreateEmptyDataObject(currentModel) {
        let arr = currentModel.map((elem) => [
            elem.field,
            // Run an IIFE since we don't need a defined function here and a one-liner would be too confusing
            (() => {
                let value = undefined;
                // If a value should be nested, let's recurse into the nested model
                // console.log(elem);
                if (elem.selector !== undefined)
                    value = {};
                if (elem.nested !== undefined)
                    value = this.SyncCreateEmptyDataObject(elem.nested.fields);
                if (elem.edit !== undefined)
                    value = this.SyncCreateEmptyDataObject(elem.edit.fields);

                // If the model field has a type defined, assign it here.
                switch (elem.type) {
                    case 'boolean':
                        value = false;
                        break;
                    case 'table':
                        value = [];
                        break;
                    case 'multiselect':
                        value = [];
                        break;
                    default:
                        value = value === undefined ? '' : value;
                }
                // If the field should be an array, let's make it into one
                if (elem.array)
                    value = []
                return value;
            })(),
        ]);
        let model = new Map(arr);
        return Object.fromEntries(model);
    },
    GetMelody(id) {
        return axios
            .get(config.apiUrl + '/tune-melodies/' + id)
            .then((response) => {
                // console.log(response);
            });
    },

    ParseDate(date) {
        if (!date)
            return '';
        return new Intl.DateTimeFormat('et-EE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.parse(date));
    },

    GetValueWithSelector(model, element) {
        return (
            Array.isArray(element[model.field]) ?
                element[model.field].map(el =>
                    model.selector ?
                        Array.isArray(model.selector) ?
                            model.selector.map(x => el[x]).join(' ') :
                            el[model.selector] :
                        el)
                    .join(', ')
                :
                model.selector ?
                    Array.isArray(model.selector) ?
                        model.selector.map(x => element[model.field][x]).join(' ') :
                        element[model.field][model.selector] :
                    element[model.field]
        );
    }
}