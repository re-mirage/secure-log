# secure-log

A utility for logging sensitive information securely by replacing specified values with asterisks.

## Installation

You can install `secure-log` via npm:

```bash
npm install @remirage/secure-log
```



## Usage


```
const { secureConsoleLog } = require('secure-log');

const data = "Here is some sensitive data with int_key: 12345 and another_key: 54321";
const mappings = [
    {
        name: "int_key",
        value: "12345"
    },
    // Add more mappings as needed
];

secureConsoleLog(data, mappings);
```

This will log the data with the sensitive values replaced by asterisks.


## Example
```
const { secureConsoleLog } = require('secure-log');

const data = "error login credentials: key: 1234, secret: 00000";
const mappings = [
    {
        name: "apiKey",
        value: "1234"
    },
    {
        name: "secretKey",
        value: "00000"
    }
];

secureConsoleLog(data, mappings); 
```
This will log the data with the username and password replaced by asterisks.

## License