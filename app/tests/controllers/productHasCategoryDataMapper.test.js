/* eslint-disable max-len */
import ProductHasCategoryDataMapper from '../../models/productHasCategoryDataMapper.js';
import client from '../../models/helpers/database.js';

// Mock the client module
jest.mock('../../models/helpers/database.js', () => ({
  query: jest.fn(),
}));

describe('ProductHasCategoryDataMapper', () => {
  describe('updateProductCategories', () => {
    it('should update the categories of a product in the database', async () => {
      // Arrange
      const productId = 1;
      const categoryIds = [1, 2, 3];
      const mockResult = { id: productId, categories: categoryIds };

      // Mock client.query pour retourner le résultat attendu
      client.query.mockResolvedValueOnce({ rows: [mockResult] });

      // Act
      const result = await ProductHasCategoryDataMapper.updateProductCategories(productId, categoryIds);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(productId);
      expect(result.categories).toEqual(categoryIds);
    });
  });
});
