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
            elementData.reference === '' || elementData.reference === null ? '' : 'X: ' + elementData.reference,
            elementData.customInput === '' || elementData.customInput === null ? '' : elementData.customInput,
            elementData.alter === '' || elementData.alter === null ? '' : 'K: ' + elementData.alter,
            elementData.tempo === '' || elementData.tempo === null ? '' : 'Q: ' + elementData.tempo,
            elementData.noteLength === '' || elementData.noteLength === null ? '' : 'L: ' + elementData.noteLength
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

        missingFields.forEach(x =>
            errors.push(translator('validation.' + x) + translator('validation.isMissing'))
        );

        tune.musicalCharacteristics.forEach((x, i) => {
            if (x.soundRangeId === undefined)
                errors.push(translator('validation.tunes.musicalCharacteristics.missingSoundRange') + (i + 1));
        });

        tune.tuneEncodings?.forEach((x, i) => {
            x.tuneMelodies?.forEach((y, j) => {
                if (y.melody === '')
                    errors.push(translator('validation.tunes.melodies.missingMelody') + (i + 1) + ' -> ' + (j + 1));
            });
        });

        tune.tuneTranscriptions?.forEach((x, i) => {
            if (x.transcriptionSourceId === undefined)
                errors.push(translator('validation.tunes.transcriptions.missingSource') + (i + 1));
            if (x.fileReference === '')
                errors.push(translator('validation.tunes.transcriptions.missingFileReference') + (i + 1));
            x.transcriptionsPersonsRoles?.forEach((y, j) => {
                // if (y.personId === undefined)
                //     errors.push(translator('validation.tunes.transcriptions.persons.missingPerson') + (i + 1) + ' -> ' + (j + 1));
                if (y.transcriptionPersonRoleTypeId === undefined)
                    errors.push(translator('validation.tunes.transcriptions.persons.missingRoleType') + (i + 1) + ' -> ' + (j + 1));
            })
        });

        tune.tunesPersonsRoles.forEach((x, i) => {
            if (x.tunePersonRoleTypeId === undefined)
                errors.push(translator('validation.tunes.personsRoles.missingRoleTypeId') + (i + 1));
        });

        tune.tunePlaces.forEach((x, i) => {
            if (x.parishId === undefined)
                errors.push(translator('validation.tunes.places.missingParish') + (i + 1));
            if (x.tunePlaceTypeId === undefined)
                errors.push(translator('validation.tunes.places.missingPlaceType') + (i + 1));
        })

        tune.tunePerformances.forEach((x, i) => {
            if (x.actualPerformanceTypeId === undefined)
                errors.push(translator('validation.tunes.performances.missingActualPerformanceType') + (i + 1));
        });

        errors.forEach(x => toast.error(x, {
            closeButton: true,
            autoClose: false,
        }))
        return errors.length === 0;
    }
}