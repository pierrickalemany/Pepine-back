import OrderDataMapper from '../../models/orderDataMapper.js';
import client from '../../models/helpers/database.js';

jest.mock('../../models/helpers/database.js', () => ({
  query: jest.fn(),
}));

describe('OrderDataMapper', () => {
  beforeEach(() => {
    client.query.mockClear();
  });

  describe('findAllOrders', () => {
    it('should return an array of orders', async () => {
      client.query.mockResolvedValueOnce({ rows: [{ id: 1 }, { id: 2 }] });
      const orders = await OrderDataMapper.findAllOrders();
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeGreaterThan(0);
      expect(client.query).toHaveBeenCalled();
    });
  });

  describe('OrderDataMapper', () => {
    // ... autres tests ...

    describe('findOrderByPk', () => {
      it('should return an order object', async () => {
        const orderId = 1; // Un ID d'ordre existant
        const mockOrder = { id: orderId, status: 'pending' };

        // Simuler la réponse de client.query avec les valeurs attendues
        client.query.mockResolvedValueOnce({ rows: [mockOrder] });

        const order = await OrderDataMapper.findOrderByPk(orderId);

        // Expression régulière pour la requête SQL
        const expectedQueryTextRegex = /SELECT \* FROM getAllOrders\s+WHERE id=\$1\s*/i;

        // Vérifier que la requête SQL correspond à l'expression régulière
        expect(client.query.mock.calls[0][0].text).toMatch(expectedQueryTextRegex);
        // Vérifier que les valeurs passées à la requête SQL sont correctes
        expect(client.query.mock.calls[0][0].values).toEqual([orderId]);

        // Vérifier que l'objet retourné correspond à l'objet mock
        expect(order).toEqual(mockOrder);
      });
    });

    // ... autres tests ...
  });

  describe('updateOrderStatus', () => {
    it('should update the status of an order', async () => {
      const orderId = 1; // Un ID d'ordre existant
      const newStatus = 'completed';
      client.query.mockResolvedValueOnce({ rows: [{ id: orderId, status: newStatus }] });

      const updatedOrder = await OrderDataMapper.updateOrderStatus(orderId, newStatus);

      const expectedQuery = {
        text: 'SELECT update_order_status($1, $2)',
        values: [orderId, newStatus],
      };

      expect(typeof updatedOrder).toBe('object');
      expect(updatedOrder.status).toBe(newStatus);
      expect(client.query).toHaveBeenCalledWith(expectedQuery);
    });
  });
});
