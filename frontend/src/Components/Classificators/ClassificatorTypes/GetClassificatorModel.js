import { ClassificatorsModel } from "../../../Models";
import { ModelService } from "../../../Services";

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

    return ModelService.GenerateDefaults(currentClassificatorModel)[viewType];
});

export default getClassificatorModel;