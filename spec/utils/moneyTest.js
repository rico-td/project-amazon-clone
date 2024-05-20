import { formatCurrency } from '../../utils/money.js';

describe('test suite: formatCurrency():', () => {

    // basic test
    it('returns a string with with two decimals', () => {
        expect(formatCurrency(1050)).toBe('10.50');
    }); 

    // zero test
    it('runs with 0', () => {
        expect(formatCurrency(0)).toBe('0.00');
    }); 
    it('rounds up to the nearest cent with >= 0.5', () => {
        expect(formatCurrency(1000.5)).toBe('10.01');
    });
    it('rounds down to the nearest cent with < 0.5', () => {
        expect(formatCurrency(1000.4)).toBe('10.00');
    });
});