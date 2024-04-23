
/**
 * Represents a mapping between a name and a value.
 */
interface Mapping {
    name: string;
    value: string;
}

/**
 * Configuration options for the secure log.
 */
interface Config {
    replacement?: string;
    return?: boolean;
    displayName?: boolean;
}



/**
 * Replaces sensitive data in a string and logs the result to the console.
 * 
 * @param data - The string containing sensitive data.
 * @param mappings - An array of mappings specifying the sensitive values to replace.
 * @param config - An optional configuration object.
 * @returns If the `return` property in the config is `true`, the modified string is returned. Otherwise, `void` is returned.
 */
function secureLog(data: string, mappings: Mapping[], config?: Config): void | string {
    const defaultConfig: Config = {
        replacement: "*****",
        return: false,
        displayName: false
    };

    const mergedConfig: Config = { ...defaultConfig, ...config };
    let newData: string = deepClone(data);
    mappings.forEach(mapping => {
        const regex = new RegExp(mapping.value, 'g');
        newData = newData.replace(regex, match => {
            return mergedConfig.displayName ?
                `(${mapping.name}:${mergedConfig.replacement})` :
                `${mapping.name}: ${mergedConfig.replacement}`;
        });
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

export { secureLog };