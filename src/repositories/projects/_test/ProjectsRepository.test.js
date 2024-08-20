const ProjectsRepository = require('../ProjectsRepository');
const db = require('../../../configs/databases/postgres/db');

jest.mock('../../../configs/databases/postgres/db');

describe('ProjectsRepository', () => {
  const projectsRepository = new ProjectsRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProject', () => {
    it('should return created project', async () => {
      const data = {
        client_id: 1,
        project_name: 'Hello, world!',
        name: 'Hello, world!',
        lat: 1,
        long: 1,
        type: 'type',
        buildingtype: 'buildingtype',
        area: 1,
        numperson: 1,
        numroom: 1,
        numbathroom: 1,
        numfloor: 1,
        theme: 'theme',
        budget: 1,
        buildingtime: 'buildingtime',
        notes: 'notes',
      };

      db.command.mockResolvedValueOnce({ error: null, data: [{ id: 1 }] })
        .mockResolvedValueOnce({ error: null, data: [{ id: 1 }] })
        .mockResolvedValueOnce({ error: null, data: [{ id: 1 }] });

      const result = await projectsRepository.addProject(data, { id: 1 });
      expect(result.data[0]).toHaveProperty('id');
    });
  });

  describe('finishPaymentProject', () => {
    it('should return updated project', async () => {
      const data = 1;

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.finishPaymentProject(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getProjectsByUserId', () => {
    it('should return projects by user id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.getProjectsByUserId(data, 'role');
      expect(result.error).toBeNull();
    });

    it('should return projects by user id with role client', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.getProjectsByUserId(data, 'client');
      expect(result.error).toBeNull();
    });
  });

  describe('deleteProjectById', () => {
    it('should return deleted project', async () => {
      const data = {
        id: 1,
      };

      db.command.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.deleteProjectById(data);
      expect(result.error).toBeNull();
    });
  });

  describe('getProjectsById', () => {
    it('should return project by id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.getProjectsById(data);
      expect(result.error).toBeNull();
    });
  });

  describe('finishProject', () => {
    it('should return updated project', async () => {
      const data = 1;

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.finishProject(data);
      expect(result.error).toBeNull();
    });
  });

  describe('addStatusByProjectId', () => {
    it('should return updated project', async () => {
      const data = {
        name: 'name',
        desc: 'desc',
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.addStatusByProjectId(data, '1');
      expect(result.error).toBeNull();
    });
  });

  describe('getStatusByProjectId', () => {
    it('should return status by project id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.getStatusByProjectId(data);
      expect(result.error).toBeNull();
    });
  });

  describe('addLampiranByProjectId', () => {
    it('should return updated project', async () => {
      const data = {
        name: 'name',
        link: 'link',
        desc: 'desc',
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.addLampiranByProjectId(data, '1');
      expect(result.error).toBeNull();
    });
  });

  describe('getLampiranByProjectId', () => {
    it('should return lampiran by project id', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.getLampiranByProjectId(data);
      expect(result.error).toBeNull();
    });
  });

  describe('accProject', () => {
    it('should return updated project', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null });
      db.command.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.accProject(data);
      expect(result.error).toBeNull();
    });
  });

  describe('processingProject', () => {
    it('should return updated project', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null })
        .mockResolvedValueOnce({ error: null });
      db.command.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.processingProject(data);
      expect(result.error).toBeNull();
    });
  });

  describe('checkProject', () => {
    it('should return updated project', async () => {
      const data = {
        id: 1,
      };

      db.query.mockResolvedValueOnce({ error: null })
        .mockResolvedValueOnce({ error: null });
      db.command.mockResolvedValueOnce({ error: null });

      const result = await projectsRepository.checkProject(data);
      expect(result.error).toBeNull();
    });
  });
});
