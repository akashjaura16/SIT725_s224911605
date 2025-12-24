import { expect } from 'chai';
import { add } from '../utils/calculator.js';

describe('Calculator Function Tests', () => {

  it('should add two positive numbers (valid case)', () => {
    expect(add(2, 3)).to.equal(5);
  });

  it('should handle negative numbers (edge case)', () => {
    expect(add(-2, -3)).to.equal(-5);
  });

});
