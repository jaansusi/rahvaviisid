export const TuneService =  {
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
    }
}