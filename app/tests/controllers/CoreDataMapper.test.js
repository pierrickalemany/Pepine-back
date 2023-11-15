import CoreController from '../../controllers/api/CoreController.js';
import NoRessourceFoundError from '../../errors/NoRessourceFoundError.js';
import BadInputError from '../../errors/BadInputError.js';
// import UnauthorizedError from '../../errors/Unauthorized.js';
import ConflictError from '../../errors/ConflictError.js';
import UnprocessableEntityError from '../../errors/UnprocessableEntityError.js';

// Mock data mapper
const dataMapper = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Mock response object
const response = {
  json: jest.fn(),
};

describe('CoreController', () => {
  let controller;

  beforeEach(() => {
    controller = new CoreController();
    controller.constructor.dataMapper = dataMapper;
    controller.constructor.dataNames = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all entries from the table', async () => {
      const results = [{ id: 1, name: 'test' }];
      dataMapper.findAll.mockResolvedValueOnce(results);

      await controller.getAll(null, response);

      expect(dataMapper.findAll).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        statut: 'success',
        data: { test: results },
      });
    });

    it('should throw a NoRessourceFoundError if the result is null', async () => {
      dataMapper.findAll.mockResolvedValueOnce(null);

      await expect(controller.getAll(null, response)).rejects.toThrow(NoRessourceFoundError);
    });
  });

  describe('getOne', () => {
    it('should return one entry from the table', async () => {
      const result = { id: 1, name: 'test' };
      const request = { params: { id: 1 } };
      dataMapper.findByPk.mockResolvedValueOnce(result);

      await controller.getOne(request, response);

      expect(dataMapper.findByPk).toHaveBeenCalledTimes(1);
      expect(dataMapper.findByPk).toHaveBeenCalledWith(request.params.id);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        statut: 'success',
        data: { test: result },
      });
    });

    it('should throw a BadInputError if the ID is not a valid number', async () => {
      const request = { params: { id: 'not a number' } };

      await expect(controller.getOne(request, response)).rejects.toThrow(BadInputError);
    });

    it('should throw a NoRessourceFoundError if the result is null', async () => {
      const request = { params: { id: 1 } };
      dataMapper.findByPk.mockResolvedValueOnce(null);

      await expect(controller.getOne(request, response)).rejects.toThrow(NoRessourceFoundError);
    });
  });

  describe('create', () => {
    it('should create one entry in the table', async () => {
      const result = { id: 1, name: 'test' };
      const request = { body: { name: 'test' } };
      dataMapper.create.mockResolvedValueOnce(result);

      await controller.create(request, response);

      expect(dataMapper.create).toHaveBeenCalledTimes(1);
      expect(dataMapper.create).toHaveBeenCalledWith(request.body);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        statut: 'success',
        data: { t: result },
      });
    });

    it('should throw a ConflictError if the new entry is in conflict with another entry', async () => {
      const request = { body: { name: 'test' } };
      dataMapper.create.mockResolvedValueOnce(null);

      await expect(controller.create(request, response)).rejects.toThrow(ConflictError);
    });

    it('should throw a UnprocessableEntityError if the instructions are incorrect', async () => {
      const request = { body: { name: 'test' } };
      dataMapper.create.mockResolvedValueOnce(false);

      await expect(controller.create(request, response)).rejects.toThrow(UnprocessableEntityError);
    });
  });

  describe('update', () => {
    it('should update one entry in the table', async () => {
      const result = { id: 1, name: 'test' };
      const request = { params: { id: 1 }, body: { name: 'test' } };
      dataMapper.update.mockResolvedValueOnce(result);

      await controller.update(request, response);

      expect(dataMapper.update).toHaveBeenCalledTimes(1);
      expect(dataMapper.update).toHaveBeenCalledWith(request.body);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        statut: 'success',
        data: { t: result },
      });
    });

    it('should throw a NoRessourceFoundError if the result is null or undefined', async () => {
      const request = { params: { id: 1 }, body: { name: 'test' } };
      dataMapper.update.mockResolvedValueOnce(null);

      await expect(controller.update(request, response)).rejects.toThrow(NoRessourceFoundError);

      dataMapper.update.mockResolvedValueOnce(undefined);

      await expect(controller.update(request, response)).rejects.toThrow(NoRessourceFoundError);
    });

    it('should throw a UnprocessableEntityError if the instructions are incorrect', async () => {
      const request = { params: { id: 1 }, body: { name: 'test' } };
      dataMapper.update.mockResolvedValueOnce(false);

      await expect(controller.update(request, response)).rejects.toThrow(UnprocessableEntityError);
    });
  });

  describe('deleteOne', () => {
    it('should delete one entry from the table', async () => {
      const request = { params: { id: 1 }, user: { id: 1, role: 'admin' } };
      dataMapper.delete.mockResolvedValueOnce(1);

      await controller.deleteOne(request, response);

      expect(dataMapper.delete).toHaveBeenCalledTimes(1);
      expect(dataMapper.delete).toHaveBeenCalledWith(request.params.id);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({ status: 'success', data: null });
    });

    it('should throw a ConflictError if the entry delete is in conflict', async () => {
      const request = { params: { id: 1 }, user: { id: 1, role: 'admin' } };
      dataMapper.delete.mockResolvedValueOnce(null);

      await expect(controller.deleteOne(request, response)).rejects.toThrow(ConflictError);
    });
  });
});
