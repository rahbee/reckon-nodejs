/* global describe it */
import assert from 'assert';
import getSearchIndex from '../utils/helper';

describe('String Search Index', () => {
  describe('Not Found', () => {
    it('should return -1 when the value not found', () => {
      assert.equal(getSearchIndex('rahbee', 'n'), -1);
    });
  });

  describe('Found', () => {
    it('should NOT return -1 when the value found', () => {
      assert.notEqual(getSearchIndex('rahbee', 'be'), -1);
    });
  });

  describe('Search From Position X', () => {
    it('should return -1 since r is not present from position 1', () => {
      assert.equal(getSearchIndex('rahbee', 'r', 1), -1);
    });
  });
});
