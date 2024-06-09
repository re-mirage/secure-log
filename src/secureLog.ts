import { Config, Mapping } from "./types";

class SecureLog {
    private mappings: Mapping[];
    private config: Config;
    private originalConsoleLog: (message?: any, ...optionalParams: any[]) => void;

    constructor(mappings: Mapping[], config?: Config) {
        this.mappings = mappings;
        this.config = {
            placeholder: "*****",
            shouldReturn: false,
            showMappingName: false,
            replaceConsoleLog: false,
            environment: {
                secure: false,
                ignoreKeys: []
            },
            ...config
        };

        if (this.config.environment?.secure) {
            this.addEnvMappings();
        }

        this.originalConsoleLog = console.log;
        this.patchConsole();
    }

    private addEnvMappings() {
        Object.keys(process.env).forEach(key => {
            if (process.env[key] && !this.config.environment?.ignoreKeys?.includes(key)) {
                this.mappings.push({ name: key, value: process.env[key] as string });
            }
        });
    }

    private patchConsole() {
        const secureLog = this.secureLog.bind(this);

        (console as any).secure = (data: any, config?: Config): void | string => {
            return secureLog(data, config);
        };

        if (this.config.replaceConsoleLog) {
            console.log = (data: any, config?: Config): void | string => {
                return secureLog(data, config);
            };
        }

        (console as any).restoreLog = () => {
            console.log = this.originalConsoleLog;
        };
    }

    private secureLog(data: any, config?: Config): void | string {
        const mergedConfig = { ...this.config, ...config };
        let newData: string = JSON.stringify(data);

        this.mappings.forEach(mapping => {
            const regex = new RegExp(mapping.value, 'g');
            newData = newData.replace(regex, match => {
                return mergedConfig.showMappingName ?
                    `(${mapping.name}:${mergedConfig.placeholder})` :
                    `${mergedConfig.placeholder}`;
            });
        });

        const parsedData = JSON.parse(newData);
        this.originalConsoleLog(parsedData);
        if (mergedConfig.shouldReturn) {
            return parsedData;
        }
    }
}

export default SecureLog