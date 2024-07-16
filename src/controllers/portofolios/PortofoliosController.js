const validator = require('../../validator');
const portofoliosSchema = require('../../validator/portofolios/portofoliosSchema');

class PortofoliosController {
  constructor(portofoliosRepository, portofolioAttachmentsRepository, userRepository, storageRepository) {
    this.portofoliosRepository = portofoliosRepository;
    this.portofolioAttachmentsRepository = portofolioAttachmentsRepository;
    this.userRepository = userRepository;
    this.storageRepository = storageRepository;
  }

  async createPortofolio(req, res) {
    const payload = { ...req.body, attachment_files: req.files, architect_id: req.user.id };
    const validatedPayload = validator.validatePayload(portofoliosSchema.createPortofolioSchema, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
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
    const payload = { ...req.params };
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

    const mappedData = {
      ...result.data[0],
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
    const payload = { ...req.query };
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
      portofolio.attachments = attachments.data;
    }

    return res.status(200).json({
      success: true,
      message: 'Portofolios found',
      code: 200,
      data: result.data,
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
}

module.exports = PortofoliosController;
