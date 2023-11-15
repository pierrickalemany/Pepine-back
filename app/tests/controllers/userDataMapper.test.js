import UserDataMapper from '../../models/userDataMapper.js';
import client from '../../models/helpers/database.js';
import UnauthorizedError from '../../errors/Unauthorized.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';

// Mock the client module
jest.mock('../../models/helpers/database.js', () => ({
  query: jest.fn(),
}));

describe('UserDataMapper', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
        firstname: 'John',
        lastname: 'Doe',
      };
      const mockUser = { ...userData, id: 1 };

      // Mock client.query pour retourner le résultat attendu
      client.query.mockResolvedValueOnce({ rows: [mockUser] });

      const user = await UserDataMapper.createUser(userData);

      expect(user).toEqual(mockUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should find an existing user by email', async () => {
      const email = 'test@example.com';
      const mockUser = {
        email, firstname: 'John', lastname: 'Doe', id: 1,
      };

      // Mock client.query pour retourner le résultat attendu
      client.query.mockResolvedValueOnce({ rows: [mockUser] });

      const user = await UserDataMapper.findUserByEmail(email);

      expect(user).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      const email = 'nonexistent@example.com';

      // Mock client.query pour retourner une réponse vide
      client.query.mockResolvedValueOnce({ rows: [] });

      await expect(UserDataMapper.findUserByEmail(email)).rejects.toThrow(NoRessourceFoundError);
    });
  });

  describe('findAllOrdersOfUser', () => {
    it('should find all orders of a user', async () => {
      const userId = 1;
      const mockOrders = [{ orderId: 1, userId }];

      // Mock client.query pour retourner le résultat attendu
      client.query.mockResolvedValueOnce({ rows: mockOrders });

      const orders = await UserDataMapper.findAllOrdersOfUser(userId);

      expect(orders).toEqual(mockOrders);
    });
  });
});
