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
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const isUserExist = await this.usersRepository.getUserById({ id: validatedPayload.data.vendor_id });

    if (isUserExist.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
        code: 404,
      });
    }

    const result = await this.projectsRepository.addProject(validatedPayload.data);

    if (result.error) {
      return res.status(500).send({
        success: false,
        message: 'Failed to create project',
        code: 500,
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Project succesfully created',
      code: 201,
      data: result.rows[0],
    });
  }

  async getProjectsByUserId(req, res) {
    const payload = { user_id: req.user.id };
    const validatedPayload = validator.validatePayload(projectsSchema.getProjectsByUserId, payload);
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const projects = await this.projectsRepository.getProjectsByUserId({ id: validatedPayload.data.user_id });

    if (projects.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Projects not found',
        code: 404,
        data: projects.rows,
      });
    }

    return res.status(200).send({
      success: true,
      message: 'All projects successfully fetched',
      code: 200,
      data: projects.rows,
    });
  }

  async deleteProjectById(req, res) {
    const payload = { ...req.params };
    payload.user_id = req.user.id;
    const validatedPayload = validator.validatePayload(projectsSchema.deleteProjectById, payload);
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const project = await this.projectsRepository.getProjectById(validatedPayload.data);

    if (project.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Projects not found',
        code: 404,
      });
    }

    if (project.rows[0].client_id !== validatedPayload.data.user_id) {
      return res.status(403).send({
        success: false,
        message: 'Unauthorized to delete projects not owned by you',
        code: 403,
      });
    }

    const result = await this.projectsRepository.deleteProjectById(validatedPayload.data);

    if (result.error) {
      return res.status(500).send({
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
}

module.exports = ProjectsController;
