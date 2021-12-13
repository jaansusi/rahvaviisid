import { toast } from "react-toastify";

export const TuneService = {
    CombineData(elementData) {
        if (!elementData)
            return '';
        let melodyLines = elementData.melody.split('\n');
        let wordsLines = elementData.words.split('\n');
        let melodyAndWords = melodyLines.map((melodyLine, i) => {
            return (
                melodyLine +
                (wordsLines[i] === undefined || wordsLines[i] === ''
                    ? ''
                    : '\nw: ' + wordsLines[i])
            );
        });
        return [
            elementData.reference === '' ? '' : 'X: ' + elementData.reference,
            elementData.customInput === '' ? '' : elementData.customInput,
            elementData.alter === '' ? '' : 'K: ' + elementData.alter,
            elementData.tempo === '' ? '' : 'Q: ' + elementData.tempo,
            elementData.noteLength === '' ? '' : 'L: ' + elementData.noteLength
        ]
            .concat(melodyAndWords)
            .filter((elem) => elem !== '')
            .join('\n');
    },

    Validate(tune, translator) {
        let requiredFields = [
            'nationId',
            'languageId',
            'countryId',
        ];

        let errors = [];

        let missingFields = requiredFields.filter(x => tune[x] === undefined);
        if (missingFields.length > 0) {
            missingFields.forEach(x =>
                errors.push(translator('validation.' + x) + translator('validation.isMissing'))
            )
        }

        if (tune.tunePlaces.length > 0) {
            tune.tunePlaces.forEach((x, i) => {
                if (x.parishId === undefined)
                    errors.push(translator('validation.tunes.places.missingParish') + (i + 1))
                if (x.tunePlaceTypeId === undefined)
                    errors.push(translator('validation.tunes.places.missingPlaceType') + (i + 1))
            })
        }

        if (tune.tunePerformances.length > 0) {
            tune.tunePerformances.forEach((x, i) => {
                if (x.actualPerformanceTypeId === undefined)
                    errors.push(translator('validation.tunes.performances.missingActualPerformanceType') + (i + 1))
            })
        }

        errors.forEach(x => toast.error(x, {
            closeButton: true,
            autoClose: false,
        }))
        return errors.length === 0;
    }
}