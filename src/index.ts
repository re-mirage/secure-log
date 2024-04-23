
interface Mapping {
    name: string;
    value: string;
}

interface Config {
    replacement?: string;
    return?: boolean;
}


/**
 * Logs the provided data to the console with secure replacements based on the given mappings.
 * @param data - The data to be logged.
 * @param mappings - An array of mappings containing values to be replaced and their corresponding names.
 * @param config - Optional configuration object.
 * @returns If `config.return` is `true`, returns the modified data; otherwise, returns `undefined`.
 */
function secureConsoleLog(data: string, mappings: Mapping[], config?: Config): void | string {
    const defaultConfig: Config = {
        replacement: "*****",
        return: false
    };

    const mergedConfig: Config = { ...defaultConfig, ...config };
    let newData: string = deepClone(data);
    mappings.forEach(mapping => {
        const regex = new RegExp(mapping.value, 'g');
        newData = newData.replace(regex, `${mapping.name}: ${mergedConfig.replacement}`);
    });
    console.log(newData);
    if (mergedConfig.return) {
        return newData;
    }
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