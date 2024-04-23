
interface Mapping {
    name: string;
    value: string;
}

function secureConsoleLog(data: string, mappings: Mapping[]): void {
    let newData: string = deepClone(data);
    mappings.forEach(mapping => {
        const regex = new RegExp(mapping.value, 'g');
        newData = newData.replace(regex, `${mapping.name}: *****`);
    });
    console.log(newData);
}

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