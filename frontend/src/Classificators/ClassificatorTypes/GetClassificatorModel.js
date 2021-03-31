import ClassificatorsModel from "../../Models/ClassificatorTypeModel";
import modelParser from '../../Models/ModelParser';

const getClassificatorModel = ((classificator, viewType) => {
    let currentClassificatorModel = undefined;
    loop:
    for (let groupKey in ClassificatorsModel.groups) {
        let models = ClassificatorsModel.groups[groupKey].models
        for (let modelKey in models) {
            if (models[modelKey].url === classificator) {
                currentClassificatorModel = models[modelKey];
                break loop;
            }
        }
    }
    currentClassificatorModel[viewType] = currentClassificatorModel[viewType] !== undefined ?
    currentClassificatorModel[viewType] : ClassificatorsModel.default[viewType];

    return modelParser(currentClassificatorModel)[viewType];
});

export default getClassificatorModel;