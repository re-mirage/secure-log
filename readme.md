# secure-log

A utility for logging sensitive information securely by replacing specified values with asterisks.

## Installation

You can install `secure-log` via npm:

```bash
npm install @remirage/secure-log
```






## Options
The function secureConsoleLog accepts an optional configuration object with the following options:
- replacement (string, default: "*****"): Specifies the string to replace sensitive values with.
- return (boolean, default: false): If set to true, the modified data is returned instead of logged to the console.
- displayName (boolean, default: false): If set to true, the sensitive value will be replaced with the following format: (${mapping.name}:${replacement}).

## Example
```
import { secureLog } from 'secure-log';

const data = "error login credentials: key: 123456, secret: 00000";
const mappings = [
    {
        name: "apiKey",
        value: "123456"
    },
    {
        name: "secretKey",
        value: "00000"
    }
];

// Using custom replacement and returning modified data 
secureConsoleLog(data, mappings, { replacement: "REDACTED", return: true });  // "error login credentials: key: REDACTED secret: REDACTED"


// Using displayName option
secureConsoleLog(data, mappings, { displayName: true }); // "error login credentials: key: (apiKey:REDACTED) secret: (secretKey:REDACTED)"

```

## License