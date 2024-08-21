const validator = require('../../validator');
const portofoliosSchema = require('../../validator/portofolios/portofoliosSchema');

class PortofoliosController {
  constructor(
    portofoliosRepository,
    portofolioAttachmentsRepository,
    portofolioClicksRepository,
    portofolioFavouritesRepository,
    userRepository,
    storageRepository,
    themesRepository,
  ) {
    this.portofoliosRepository = portofoliosRepository;
    this.portofolioAttachmentsRepository = portofolioAttachmentsRepository;
    this.portofolioClicksRepository = portofolioClicksRepository;
    this.portofolioFavouritesRepository = portofolioFavouritesRepository;
    this.userRepository = userRepository;
    this.storageRepository = storageRepository;
    this.themesRepository = themesRepository;
  }

  async createPortofolio(req, res) {
    const payload = {
      ...req.body,
      attachment_files: req.files.filter((file) => file.fieldname === 'attachment_files'),
      architect_id: req.user.id,
    };
    const validatedPayload = validator.validatePayload(portofoliosSchema.createPortofolioSchema, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const isThemeExist = await this.themesRepository.getThemeById({ id: validatedPayload.data.theme_id });
    if (isThemeExist.error) {
      return res.status(404).json({
        success: false,
        message: 'Theme not found',
        code: 404,
      });
    }

    const attachments = [];

    for (const attachment of validatedPayload.data.attachment_files) {
      const fileData = attachment.buffer;
      const originalFileName = attachment.originalname;
      const timestamp = Date.now();
      const fileName = `${timestamp}_${originalFileName}`;

      const fileSaveResult = await this.storageRepository.saveFile(
        fileData,
        fileName,
        'portofolio_attachments',
        'api/v1/portofolios/attachments',
      );

      if (!fileSaveResult) {
        for (const attachment of attachments) {
          await this.storageRepository.deleteFile(attachment.fileName, 'portofolio_attachments');
        }
        return res.status(500).json({
          success: false,
          message: 'Failed to save file',
          code: 500,
        });
      }

      attachments.push({
        fileName,
        filePath: fileSaveResult,
      });
    }

    const result = await this.portofoliosRepository.createPortofolio(validatedPayload.data);
    if (result.error) {
      for (const attachment of attachments) {
        await this.storageRepository.deleteFile(attachment.fileName, 'portofolio_attachments');
      }
      return res.status(500).json({
        success: false,
        message: 'Failed to create portofolio',
        code: 500,
      });
    }

    for (const attachment of attachments) {
      const attachmentPayload = {
        portofolio_id: result.data[0].id,
        name: attachment.fileName,
        path: attachment.filePath,
      };
      await this.portofolioAttachmentsRepository.createPortofolioAttachment(attachmentPayload);
    }

    return res.status(201).json({
      success: true,
      message: 'Portofolio successfully created',
      code: 201,
      data: result.data[0],
    });
  }

  async getPortofolioById(req, res) {
    const payload = { ...req.params, user_id: req.user.id };
    const validatedPayload = validator.validatePayload(portofoliosSchema.getPortofolioByIdSchema, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.portofoliosRepository.getPortofolioById(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Portofolio not found',
        code: 404,
      });
    }

    const attachments = await this.portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId({
      portofolio_id: validatedPayload.data.id,
    });

    await this.portofolioClicksRepository.createPortofolioClick({
      portofolio_id: validatedPayload.data.id,
      user_id: validatedPayload.data.user_id,
    });

    const portofolioClicks = await this.portofolioClicksRepository.getClicksByPortofolioId({
      portofolio_id: validatedPayload.data.id,
    });

    const mappedData = {
      id: result.data[0].id,
      architect: result.data[0].architect_id ? {
        id: result.data[0].architect_id,
        name: result.data[0].architect_name,
        picture: result.data[0].architect_picture,
      } : null,
      theme: result.data[0].theme_id ? {
        id: result.data[0].theme_id,
        name: result.data[0].theme_name,
        image: result.data[0].theme_image,
      } : null,
      name: result.data[0].name,
      description: result.data[0].description,
      estimated_budget: result.data[0].estimated_budget,
      created_at: result.data[0].created_at,
      click_count: Number(portofolioClicks.data[0].clicks ?? 0),
      attachments: attachments.data,
    };

    return res.status(200).json({
      success: true,
      message: 'Portofolio found',
      code: 200,
      data: mappedData,
    });
  }

  async getUserPortofolios(req, res) {
    const payload = { architect_id: req.query.architect_id || req.user.id };
    const validatedPayload = validator.validatePayload(portofoliosSchema.getUserPortofoliosSchema, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.portofoliosRepository.getUserPortofolios(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Portofolios not found',
        code: 404,
      });
    }

    for (const portofolio of result.data) {
      const attachments = await this.portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId({
        portofolio_id: portofolio.id,
      });
      const clicks = await this.portofolioClicksRepository.getClicksByPortofolioId({
        portofolio_id: portofolio.id,
      });
      portofolio.attachments = attachments.data;
      portofolio.click_count = Number(clicks.data[0].clicks ?? 0);
    }

    const mappedData = result.data.map((portofolio) => ({
      id: portofolio.id,
      architect: portofolio.architect_id ? {
        id: portofolio.architect_id,
        name: portofolio.architect_name,
        picture: portofolio.architect_picture,
      } : null,
      theme: portofolio.theme_id ? {
        id: portofolio.theme_id,
        name: portofolio.theme_name,
        image: portofolio.theme_image,
      } : null,
      name: portofolio.name,
      description: portofolio.description,
      estimated_budget: portofolio.estimated_budget,
      created_at: portofolio.created_at,
      click_count: portofolio.click_count,
      attachments: portofolio.attachments,
    }));

    return res.status(200).json({
      success: true,
      message: 'Portofolios found',
      code: 200,
      data: mappedData,
    });
  }

  async deletePortofolioById(req, res) {
    const payload = { ...req.params, architect_id: req.user.id };
    const validatedPayload = validator.validatePayload(portofoliosSchema.deletePortofolioByIdSchema, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const portofolio = await this.portofoliosRepository.getPortofolioById(validatedPayload.data);
    if (portofolio.error) {
      return res.status(404).json({
        success: false,
        message: 'Portofolio not found',
        code: 404,
      });
    }

    if (portofolio.data[0].architect_id !== validatedPayload.data.architect_id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete portofolios not owned by you',
        code: 403,
      });
    }

    const attachments = await this.portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId({
      portofolio_id: validatedPayload.data.id,
    });

    if (attachments.data) {
      for (const attachment of attachments.data) {
        await this.storageRepository.deleteFile(attachment.name, 'portofolio_attachments');
      }
    }

    const result = await this.portofoliosRepository.deletePortofolioById(validatedPayload.data);
    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete portofolio',
        code: 500,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Portofolio successfully deleted',
      code: 200,
    });
  }

  async updatePortofolioById(req, res) {
    const payload = {
      ...req.params,
      ...req.body,
      architect_id: req.user.id,
      attachment_files: req.files.filter((file) => file.fieldname === 'attachment_files'),
    };

    const validatedPayload = validator.validatePayload(portofoliosSchema.updatePortofolio, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const portofolio = await this.portofoliosRepository.getPortofolioById({ id: validatedPayload.data.id });
    if (portofolio.error) {
      return res.status(404).json({
        success: false,
        message: 'Portofolio not found',
        code: 404,
      });
    }

    if (portofolio.data[0].architect_id !== validatedPayload.data.architect_id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to update portofolios not owned by you',
        code: 403,
      });
    }

    const isThemeExist = await this.themesRepository.getThemeById({ id: validatedPayload.data.theme_id });
    if (isThemeExist.error) {
      return res.status(404).json({
        success: false,
        message: 'Theme not found',
        code: 404,
      });
    }

    const attachments = [];

    for (const attachment of validatedPayload.data.attachment_files) {
      const fileData = attachment.buffer;
      const originalFileName = attachment.originalname;
      const timestamp = Date.now();
      const fileName = `${timestamp}_${originalFileName}`;

      const fileSaveResult = await this.storageRepository.saveFile(
        fileData,
        fileName,
        'portofolio_attachments',
        'api/v1/portofolios/attachments',
      );

      if (!fileSaveResult) {
        for (const attachment of attachments) {
          await this.storageRepository.deleteFile(attachment.fileName, 'portofolio_attachments');
        }
        return res.status(500).json({
          success: false,
          message: 'Failed to save file',
          code: 500,
        });
      }

      attachments.push({
        fileName,
        filePath: fileSaveResult,
      });
    }

    const result = await this.portofoliosRepository.updatePortofolio(validatedPayload.data);
    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update portofolio',
        code: 500,
      });
    }

    const oldAttachments = await this.portofolioAttachmentsRepository.getPortofolioAttachmentsByPortofolioId({
      portofolio_id: validatedPayload.data.id,
    });

    if (oldAttachments.data) {
      for (const attachment of oldAttachments.data) {
        await this.storageRepository.deleteFile(attachment.name, 'portofolio_attachments');
        await this.portofolioAttachmentsRepository.deletePortofolioAttachmentById({ id: attachment.id });
      }
    }

    for (const attachment of attachments) {
      const attachmentPayload = {
        portofolio_id: result.data[0].id,
        name: attachment.fileName,
        path: attachment.filePath,
      };
      await this.portofolioAttachmentsRepository.createPortofolioAttachment(attachmentPayload);
    }

    return res.status(200).json({
      success: true,
      message: 'Portofolio successfully updated',
      code: 200,
      data: result.data[0],
    });
  }

  async getTrendingPortofolios(req, res) {
    const payload = { ...req.query };

    const validatedPayload = validator.validatePayload(portofoliosSchema.getAllPortofolios, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.portofoliosRepository.getTrendingPortofolios(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Trending portofolios not found',
        code: 404,
      });
    }

    const mappedData = result.data.map((portofolio) => ({
      id: portofolio.id,
      architect: portofolio.architect_id ? {
        id: portofolio.architect_id,
        name: portofolio.architect_name,
        picture: portofolio.architect_picture,
      } : null,
      theme: portofolio.theme_id ? {
        id: portofolio.theme_id,
        name: portofolio.theme_name,
        image: portofolio.theme_image,
      } : null,
      name: portofolio.name,
      description: portofolio.description,
      estimated_budget: portofolio.estimated_budget,
      created_at: portofolio.created_at,
      click_count: portofolio.click_count,
    }));

    return res.status(200).json({
      success: true,
      message: 'Trending portofolios found',
      code: 200,
      data: mappedData,
    });
  }

  async getRecentPortofolios(req, res) {
    const payload = { ...req.query };

    const validatedPayload = validator.validatePayload(portofoliosSchema.getAllPortofolios, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.portofoliosRepository.getRecentPortofolios(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Recent portofolios not found',
        code: 404,
      });
    }

    const mappedData = result.data.map((portofolio) => ({
      id: portofolio.id,
      architect: portofolio.architect_id ? {
        id: portofolio.architect_id,
        name: portofolio.architect_name,
        picture: portofolio.architect_picture,
      } : null,
      theme: portofolio.theme_id ? {
        id: portofolio.theme_id,
        name: portofolio.theme_name,
        image: portofolio.theme_image,
      } : null,
      name: portofolio.name,
      description: portofolio.description,
      estimated_budget: portofolio.estimated_budget,
      created_at: portofolio.created_at,
      click_count: portofolio.click_count,
    }));

    return res.status(200).json({
      success: true,
      message: 'Recent portofolios found',
      code: 200,
      data: mappedData,
    });
  }

  async getPortofolioFavourites(req, res) {
    const payload = { user_id: req.user.id };
    const validatedPayload = validator.validatePayload(portofoliosSchema.getPortofolioFavourites, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.portofoliosRepository.getFavoritePortofolios(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Portofolio favourites not found',
        code: 404,
      });
    }

    const mappedData = result.data.map((portofolio) => ({
      id: portofolio.id,
      architect: portofolio.architect_id ? {
        id: portofolio.architect_id,
        name: portofolio.architect_name,
        picture: portofolio.architect_picture,
      } : null,
      theme: portofolio.theme_id ? {
        id: portofolio.theme_id,
        name: portofolio.theme_name,
        image: portofolio.theme_image,
      } : null,
      name: portofolio.name,
      description: portofolio.description,
      estimated_budget: portofolio.estimated_budget,
      created_at: portofolio.created_at,
      click_count: portofolio.click_count,
    }));

    return res.status(200).json({
      success: true,
      message: 'Portofolio favourites found',
      code: 200,
      data: mappedData,
    });
  }

  async favouritePortofolio(req, res) {
    const payload = { ...req.body, user_id: req.user.id };
    const validatedPayload = validator.validatePayload(portofoliosSchema.favouritePortofolio, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const portofolio = await this.portofoliosRepository.getPortofolioById({ id: validatedPayload.data.portofolio_id });
    if (portofolio.error) {
      return res.status(404).json({
        success: false,
        message: 'Portofolio not found',
        code: 404,
      });
    }

    const isAlreadyFavorite = await this.portofolioFavouritesRepository.getPortofolioFavouriteByUserAndPortofolioId(
      validatedPayload.data,
    );

    if (isAlreadyFavorite.data) {
      const resultDelete = await this.portofolioFavouritesRepository.deletePortofolioFavourite(validatedPayload.data);
      if (resultDelete.error) {
        return res.status(500).json({
          success: false,
          message: 'Failed to delete favourite portofolio',
          code: 500,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Portofolio successfully unfavourited',
        code: 200,
      });
    }

    const result = await this.portofolioFavouritesRepository.createPortofolioFavourite(validatedPayload.data);
    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to favourite portofolio',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Portofolio successfully favourited',
      code: 201,
    });
  }
}

module.exports = PortofoliosController;
