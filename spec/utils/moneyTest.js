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
    
    it('workes with negative numbers', () => {
        expect(formatCurrency(-1000.51)).toEqual('-10.01');
        expect(formatCurrency(-1000.50)).toEqual('-10.00');
        expect(formatCurrency(-1000.49)).toEqual('-10.00');
    }); 
});