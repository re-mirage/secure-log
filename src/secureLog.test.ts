import SecureLog from './secureLog';

describe('SecureLog', () => {
    it('should replace sensitive data with placeholders', () => {
        const mappings: any[] = [{ name: 'password', value: '123456' }];
        const secureLog = new SecureLog(mappings, {
            shouldReturn: true,
        });
        const logOutput = console.secure({ password: '123456' });
        expect(logOutput).toStrictEqual({ password: "*****" });
    });
    it('should handle environment variables if environment is secure', () => {

        const originalEnv = process.env.SECRET_KEY;
        process.env.SECRET_KEY = 'mysecret';
        const mappings: any[] = [];
        const secureLog = new SecureLog(mappings, { environment: { secure: true } });
        console.secure = jest.fn().mockReturnValue('{"secretKey":"*****"}');

        const logOutput = console.secure({ secretKey: process.env.SECRET_KEY });
        expect(logOutput).toBe('{"secretKey":"*****"}');
        process.env.SECRET_KEY = originalEnv;
    });
    it('should restore console.log to original implementation', () => {
        const mappings: any[] = [];
        const secureLog = new SecureLog(mappings, { replaceConsoleLog: true });
        secureLog.restoreConsoleLog();
        expect(console.log).toEqual(secureLog.originalConsoleLog);
    });
});
