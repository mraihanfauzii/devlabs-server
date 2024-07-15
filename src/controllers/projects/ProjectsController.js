const validator = require('../../validator');
const projectsSchema = require('../../validator/projects/projectsSchema');

class ProjectsController {
  constructor(projectsRepository, usersRepository) {
    this.projectsRepository = projectsRepository;
    this.usersRepository = usersRepository;
  }

  async addProject(req, res) {
    const payload = { ...req.body };
    payload.client_id = req.user.id;
    const validatedPayload = validator.validatePayload(projectsSchema.addProject, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const isUserExist = await this.usersRepository.getUserById({ id: validatedPayload.data.vendor_id });

    if (isUserExist.error) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 404,
      });
    }

    const result = await this.projectsRepository.addProject(validatedPayload.data);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create project',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Project succesfully created',
      code: 201,
      data: result.data[0],
    });
  }

  async accProject(req, res) {
    const { id } = req.params

    const result = await this.projectsRepository.accProject(id);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to accept project',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Project succesfully accepted',
      code: 201,
      data: result,
    });
  }

  async checkProject(req, res) {
    const { id } = req.params

    const result = await this.projectsRepository.checkProject(id);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to check project',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Project check',
      code: 201,
      data: result,
    });
  }
  async finishProject(req, res) {
    const { id } = req.params

    const result = await this.projectsRepository.finishProject(id);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to finish project',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Project finish',
      code: 201,
      data: result,
    });
  }

  async getProjectsByUserId(req, res) {
    const payload = { user_id: req.user.id };
    const validatedPayload = validator.validatePayload(projectsSchema.getProjectsByUserId, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const projects = await this.projectsRepository.getProjectsByUserId({ id: validatedPayload.data.user_id });

    if (projects.error) {
      return res.status(404).json({
        success: false,
        message: 'Projects not found',
        code: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'All projects successfully fetched',
      code: 200,
      data: projects.data,
    });
  }

  async deleteProjectById(req, res) {
    const payload = { ...req.params };
    payload.user_id = req.user.id;
    const validatedPayload = validator.validatePayload(projectsSchema.deleteProjectById, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const project = await this.projectsRepository.getProjectById(validatedPayload.data);

    if (project.error) {
      return res.status(404).json({
        success: false,
        message: 'Projects not found',
        code: 404,
      });
    }

    if (project.data[0].client_id !== validatedPayload.data.user_id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete projects not owned by you',
        code: 403,
      });
    }

    const result = await this.projectsRepository.deleteProjectById(validatedPayload.data);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete project',
        code: 500,
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Project successfully deleted',
      code: 200,
    });
  }

  async getProjectsById(req, res) {
    const {id } = req.params
    
    const projects = await this.projectsRepository.getProjectsById({ id: id });
    
    if (projects.error) {
      return res.status(404).json({
        success: false,
        message: 'Projects not found',
        code: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'All projects successfully fetched',
      code: 200,
      data: projects.data,
    });
  }
}

module.exports = ProjectsController;
