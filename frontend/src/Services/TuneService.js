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
            'countryId'
        ];

        let missingFields = requiredFields.filter(x => tune[x] === undefined);
        if (missingFields.length > 0) {
            missingFields.forEach(x =>
                toast.error(translator('validation.' + x) + translator('validation.isMissing'), {
                    closeButton: true,
                    autoClose: false,
                }));
            return false;
        }
        return true;
    }
}