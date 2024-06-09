
export { }
/**
 * Represents a mapping between a name and a value.
 */
export interface Mapping {
    name: string;
    value: string;
}

/**
 * Configuration options for the secure log.
 */
export interface Config {
    placeholder?: string; // The string that will replace the value in the secure log.
    shouldReturn?: boolean; // If true, the secure log will return the parsed data.
    showMappingName?: boolean; // If true, the name of the mapping will be displayed in the secure log.
    replaceConsoleLog?: boolean; // If true, the secure log will override the console.log method.
    environment?: { // Configuration for securing environment variables
        secure?: boolean; // If true, the secure log will replace environment variables.
        ignoreKeys?: string[]; // Array of keys that will be ignored from the environment variables.
    };
}


declare global {
    interface Console {
        secure(data: any, config?: Config): void | string;
        restoreLog(): void;
    }
}