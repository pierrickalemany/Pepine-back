import CategoryDataMapper from '../../models/categoryDataMapper.js';
import client from '../../models/helpers/database.js';

jest.mock('../../models/helpers/database.js');

describe('CategoryDataMapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllProductsOfCategory', () => {
    it('should fetch all entries from the database according to category id', async () => {
      const id = 1;
      const expectedQuery = {
        text:
        `
        SELECT * FROM getAllProducts gap
        LEFT JOIN product_has_category pc ON gap.id = pc.product_id
        LEFT JOIN category c ON pc.category_id = c.id
        WHERE c.id=$1
        ORDER BY gap.id
        `,
        values: [id],
      };
      const expectedRows = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      client.query.mockResolvedValueOnce({ rows: expectedRows });

      const result = await CategoryDataMapper.findAllProductsOfCategory(id);

      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(expectedQuery);
      expect(result).toEqual(expectedRows);
    });
  });
});
