# SecureLog

A TypeScript utility for securely logging messages by replacing sensitive information with a placeholder. This library provides a way to safely log information without exposing sensitive data.

## Installation

You can install `SecureLog` using npm, yarn, or bun.

### Using npm
```
npm install @remirage/secure-log
```


### Using yarn
```
yarn add @remirage/secure-log
```

### Using bun
```
bun add @remirage/secure-log
```

## Usage

### Import and Initialize

First, import the `SecureLog` class and initialize it with your mappings and optional configuration.

```typescript
import { SecureLog, Mapping, Config } from '@remirage/secure-log';

// Example mappings
const mappings: Mapping[] = [
    { name: "password", value: "myPassword123" },
    { name: "apiKey", value: "abc123secretKey" }
];

// Optional configuration
const config: Config = {
    placeholder: "[REDACTED]",
    showMappingName: true,
    replaceConsoleLog: true,
    environment: {
        secure: true,
        ignoreKeys: ["SOME_SECRET_KEY"]
    }
};

// Initialize SecureLog
const secureLogInstance = new SecureLog(mappings, config);
```


### Using console.secure
After initializing `SecureLog`, you can use `console.secure` to securely log messages. The `console.secure` method will replace any sensitive data based on the provided mappings and configuration.

```typescript
// String data
console.secure("User login with password: myPassword123");

// Object data
console.secure({ message: "API call with apiKey: abc123secretKey" });

// Array data
console.secure(["Array element with password: myPassword123", "Another secret: abc123secretKey"]);
```

### Overriding console.log
If `replaceConsoleLog` is set to `true` in the configuration, both `console.log` and `console.secure` will securely log messages.


```typescript
// String data
console.log("User login with password: myPassword123");

// Object data
console.log({ message: "API call with apiKey: abc123secretKey" });

// Array data
console.log(["Array element with password: myPassword123", "Another secret: abc123secretKey"]);
```

### Restore Original `console.log`
If needed, you can restore the original `console.log` functionality.

```typescript
// Restore the original console.log
console.restoreLog();
```

## Configuration Options
The `SecureLog` class accepts an optional configuration object with the following properties:

* `placeholder`: A string to replace the sensitive data (default: `"*****"`).
* `shouldReturn`: A boolean indicating whether to return the modified data (default: `false`).
* `showMappingName`: A boolean indicating whether to include the mapping name in the replacement (default: `false`).
* `replaceConsoleLog`: A boolean indicating whether to override `console.log` to behave like `console.secure` (default: `false`).
* `environment`: An object with the following properties:
  - `secure`: A boolean indicating whether to secure all environment variables (default: `false`).
  - `ignoreKeys`: An array of keys that will be ignored from the environment variables.



### Example
Here's a complete example:

```
import { SecureLog, Mapping, Config } from '@remirage/secure-log';

// Example mappings
const mappings: Mapping[] = [
    { name: "password", value: "myPassword123" },
    { name: "apiKey", value: "abc123secretKey" }
];

// Optional configuration
const config: Config = {
    placeholder: "[REDACTED]",
    showMappingName: true,
    replaceConsoleLog: true,
    environment: {
        secure: true,
        ignoreKeys: ["SOME_SECRET_KEY"]
    }
};

// Initialize SecureLog
const secureLogInstance = new SecureLog(mappings, config);

// Using console.secure
console.secure("User login with password: myPassword123");
console.secure({ message: "API call with apiKey: abc123secretKey" });
console.secure(["Array element with password: myPassword123", "Another secret: abc123secretKey"]);

// Using console.log if replaceConsoleLog is true
console.log("User login with password: myPassword123");
console.log({ message: "API call with apiKey: abc123secretKey" });
console.log(["Array element with password: myPassword123", "Another secret: abc123secretKey"]);

// Restore the original console.log if needed
console.restoreLog();

```