export function parseJson(str) {
    const results = [];

    let endOfString = false;
    let index = 0;
    
    do {
        let result = traverseString(str, index);
        if(result) {
            if(result.json) {
                index = result.lastIndex + 1;
                results.push(result);
            } else {
                index = result.startIndex + 1;
            }
        }
    } while (!endOfString && index < str.length && index !== -1);

    return results;
}

function traverseString(str, startIndex) {
    let firstCurlyBracket = str.indexOf('{', startIndex);
    let lastCurlyBracket = str.lastIndexOf('}');

    // definitely no more jsons
    if(lastCurlyBracket < firstCurlyBracket) return;

    let index = firstCurlyBracket + 1;
    let compareBrackets = 1;
    let candidate = '{';
    while(index < str.length && compareBrackets > 0) {
        switch(str.charAt(index)) {
            case '{':
                compareBrackets++;
                break;
            case '}':
                compareBrackets--;
                break;
        }

        candidate += str.charAt(index);
        index++;
    }

    try {
        JSON.parse(candidate);
        return {
            json: candidate,
            startIndex: firstCurlyBracket,
            lastIndex: firstCurlyBracket + candidate.length - 1
        };
    } catch(e) {
        // this opening bracket was not the beginning of a JSON
        return {
            json: undefined,
            startIndex: firstCurlyBracket,
            lastIndex: undefined
        };
    }
}