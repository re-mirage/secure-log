
interface Mapping {
    name: string;
    value: string;
}

/**
 * Replaces sensitive data in the input string with masked values and logs the result to the console.
 * 
 * @param data - The input string containing sensitive data.
 * @param mappings - An array of mappings specifying the sensitive data values and their corresponding names.
 */
function secureConsoleLog(data: string, mappings: Mapping[]): void {
    let newData: string = deepClone(data);
    mappings.forEach(mapping => {
        const regex = new RegExp(mapping.value, 'g');
        newData = newData.replace(regex, `${mapping.name}: *****`);
    });
    console.log(newData);
}

/**
 * Creates a deep clone of the given object.
 * 
 * @param obj - The object to clone.
 * @returns A deep clone of the object.
 */
function deepClone<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)) as T;
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: any = {};
        for (let key in obj) {
            newObj[key] = deepClone(obj[key]);
        }
        return newObj;
    } else {
        return obj;
    }
}

export { secureConsoleLog };