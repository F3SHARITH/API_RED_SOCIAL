import { UsuariosService } from './usuarios.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let userModel: { findById: jest.Mock };

  beforeEach(() => {
    userModel = {
      findById: jest.fn(),
    };

    service = new UsuariosService(userModel as any);
  });

  it('devuelve una respuesta exitosa cuando encuentra un usuario por id', async () => {
    const mockUser = { _id: '123', nombre: 'Ana' };
    const populate = jest.fn().mockResolvedValue(mockUser);

    userModel.findById.mockReturnValue({ populate });

    const result = await service.findOne('123');

    expect(userModel.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(ResponseHelper.success(mockUser));
  });
});
