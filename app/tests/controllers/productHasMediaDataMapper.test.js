/* eslint-disable max-len */
import ProductHasMediaDataMapper from '../../models/productHasMediaDataMapper.js';
import client from '../../models/helpers/database.js';

// Mock the client module
jest.mock('../../models/helpers/database.js', () => ({
  query: jest.fn(),
}));

describe('ProductHasMediaDataMapper', () => {
  describe('updateProductMedias', () => {
    it('should update the media URLs of a product in the database', async () => {
      // Arrange
      const productId = 1;
      const mediaUrls = ['url1', 'url2', 'url3'];
      const mockResult = { id: productId, medias: mediaUrls };

      // Mock client.query pour retourner le résultat attendu
      client.query.mockResolvedValueOnce({ rows: [mockResult] });

      // Act
      const result = await ProductHasMediaDataMapper.updateProductMedias(productId, mediaUrls);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(productId);
      expect(result.medias).toEqual(mediaUrls);
    });
  });
});
