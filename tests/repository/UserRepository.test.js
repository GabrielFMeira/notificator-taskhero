import UserRepository from '../../src/repository/UserRepository';
import seq from '../../src/db.js';

describe('UserRepository Integration', () => {
  const repository = new UserRepository();
  let transaction;

  beforeAll(async () => {
    await seq.authenticate();
  });

  beforeEach(async () => {
    transaction = await seq.transaction();

    await seq.query(`
      INSERT INTO usuarios (id, nome, email, senha, "createdAt", "updatedAt")
      VALUES (98, 'Gabriel', 'gabriel@gmail.com', 'senha', NOW(), NOW()),
             (99, 'Ana', 'ana@gmail.com', 'senhaaa', NOW(), NOW())
    `, { transaction });

    await seq.query(`
      INSERT INTO metas (usuario_id, titulo, status, "createdAt", "updatedAt")
      VALUES (98, 'testeeee', 'PENDENTE', NOW(), NOW()),
            (99, 'testeeeeeee', 'EXPIRADO', NOW(), NOW())
    `, { transaction });
  });

  afterEach(async () => {
    await transaction.rollback();
  });

  afterAll(async () => {
    await seq.close(); 
  });

  it('Deve retornar todos os usuários com tarefas que possuem os status PENDENTE', async () => {
    const results = await repository.findUserToNotificateByStatus(['PENDENTE']);

    //TODO: revisar isso aqui
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      id: 98,
      nome: 'Gabriel',
      email: 'gabriel@gmail.com'
    });
  });
});
