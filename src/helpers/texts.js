export function capitalizeFirstLetter(inputString) {
    if (inputString && inputString.length > 0) { // Check if inputString is not undefined and has a length greater than 0
        return inputString[0].toUpperCase() + inputString.slice(1);
    } else {
        return ''; // Return an empty string if inputString is undefined or empty
    }
}
