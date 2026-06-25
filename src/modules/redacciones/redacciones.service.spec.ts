import { BadRequestException } from '@nestjs/common';
import { RedaccionesService } from './redacciones.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';

describe('RedaccionesService', () => {
  let service: RedaccionesService;
  let redaccionModel: {
    find: jest.Mock;
    countDocuments: jest.Mock;
    create: jest.Mock;
    findById: jest.Mock;
    findByIdAndUpdate: jest.Mock;
  };

  beforeEach(() => {
    redaccionModel = {
      find: jest.fn(),
      countDocuments: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    service = new RedaccionesService(redaccionModel as any);
  });

  it('aplica filtros y paginación al listar redacciones activas', async () => {
    const mockData = [{ _id: '1' }];
    const skip = jest.fn().mockReturnThis();
    const limit = jest.fn().mockResolvedValue(mockData);

    redaccionModel.find.mockReturnValue({ skip, limit });
    redaccionModel.countDocuments.mockResolvedValue(3);



    expect(redaccionModel.find).toHaveBeenCalledWith({
      activo: true,
      publicacion_id: 'pub-1',
      tipo_reaccion: {
        $regex: 'me-gusta',
        $options: 'i',
      },
      usuario_id: expect.anything(),
    });
    expect(skip).toHaveBeenCalledWith(5);
    expect(limit).toHaveBeenCalledWith(5);
    expect(redaccionModel.countDocuments).toHaveBeenCalledWith({
      activo: true,
      publicacion_id: 'pub-1',
      tipo_reaccion: {
        $regex: 'me-gusta',
        $options: 'i',
      },
      usuario_id: expect.anything(),
    });
    expect(result).toEqual(ResponseHelper.success({ total: 3, page: 2, limit: 5, data: mockData }));
  });

  it('rechaza un usuario_id inválido con un error controlado', async () => {
    await expect(service.findAll({ usuario_id: 'invalid-id' } as any)).rejects.toThrow(BadRequestException);
  });
});

