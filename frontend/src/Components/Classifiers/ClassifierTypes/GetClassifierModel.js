import { ClassifiersModel } from "../../../Models";
import { ModelService } from "../../../Services";

const getClassifierModel = ((classifier, viewType) => {
    let currentClassifierModel = undefined;
    loop:
    for (let groupKey in ClassifiersModel.groups) {
        let models = ClassifiersModel.groups[groupKey].models
        for (let modelKey in models) {
            if (models[modelKey].url === classifier) {
                currentClassifierModel = models[modelKey];
                break loop;
            }
        }
    }
    currentClassifierModel[viewType] = currentClassifierModel[viewType] !== undefined ?
    currentClassifierModel[viewType] : ClassifiersModel.default[viewType];

    return ModelService.GenerateDefaults(currentClassifierModel)[viewType];
});

export default getClassifierModel;