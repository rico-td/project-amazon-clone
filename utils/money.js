export function formatCurrency(priceCents) {
	return (Math.round(priceCents) / 100).toFixed(2);
  }
  
  export default formatCurrency;

document.addEventListener('DOMContentLoaded', () => {  
  describe('test suite: formatCurrency():',  () => {

    it('rounds down to the nearest cent', () => {
      expect(formatCurrency(1000.45)).toEqual('10.00');
    });
    it('rounds up to the nearest cent', () => {
      expect(formatCurrency(1000.5)).toEqual('10.01');
    });
    it('negative numbers', () => {
      expect(formatCurrency(-1000.51)).toEqual('-10.01');
      expect(formatCurrency(-1000.50)).toEqual('-10.00');
      expect(formatCurrency(-1000.49)).toEqual('-10.00');
    });
  });

})