const validator = require('../../validator');
const ratingsSchema = require('../../validator/ratings/ratingsSchema');

class RatingsController {
  constructor(ratingsRepository, ratingAttachmentsRepository, usersRepository, storageRepository) {
    this.ratingsRepository = ratingsRepository;
    this.ratingAttachmentsRepository = ratingAttachmentsRepository;
    this.usersRepository = usersRepository;
    this.storageRepository = storageRepository;
  }

  async createRating(req, res) {
    const payload = {
      ...req.body,
      attachment_files: req.files.filter((file) => file.fieldname === 'attachment_files'),
      rater_id: req.user.id,
    };
    const validatedPayload = validator.validatePayload(ratingsSchema.createRating, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const isRateeExist = await this.usersRepository.getUserById({ id: validatedPayload.data.ratee_id });
    if (isRateeExist.error) {
      return res.status(404).json({
        success: false,
        message: 'Ratee not found',
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
        'rating_attachments',
        'api/v1/ratings/attachments',
      );

      if (!fileSaveResult) {
        for (const attachment of attachments) {
          await this.storageRepository.deleteFile(attachment.fileName, 'rating_attachments');
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

    const result = await this.ratingsRepository.createRating(validatedPayload.data);
    if (result.error) {
      for (const attachment of attachments) {
        await this.storageRepository.deleteFile(attachment.fileName, 'rating_attachments');
      }
      return res.status(500).json({
        success: false,
        message: 'Failed to create rating',
        code: 500,
      });
    }

    for (const attachment of attachments) {
      const attachmentPayload = {
        rating_id: result.data[0].id,
        name: attachment.fileName,
        path: attachment.filePath,
      };
      await this.ratingAttachmentsRepository.createRatingAttachment(attachmentPayload);
    }

    return res.status(201).json({
      success: true,
      message: 'Rating created',
      code: 201,
      data: result.data[0],
    });
  }

  async getRatingsByRateeId(req, res) {
    const payload = { ...req.params };
    const validatedPayload = validator.validatePayload(ratingsSchema.getRatingsByRateeId, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.ratingsRepository.getRatingsByRateeId(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Ratings not found',
        code: 404,
      });
    }

    for (const rating of result.data) {
      const attachments = await this.ratingAttachmentsRepository.getRatingAttachmentsByRatingId({ rating_id: rating.id });
      rating.attachments = attachments.data;
    }

    const mappedData = result.data.map((rating) => ({
      id: rating.id,
      rater: rating.rater_id ? {
        id: rating.rater_id,
        profile_name: rating.rater_profile_name,
        profile_picture: rating.rater_profile_picture,
      } : null,
      ratee: rating.ratee_id ? {
        id: rating.ratee_id,
        profile_name: rating.ratee_profile_name,
        profile_picture: rating.ratee_profile_picture,
      } : null,
      rating: rating.rating,
      description: rating.description,
      created_at: rating.created_at,
      attachments: rating.attachments,
    }));

    return res.status(200).json({
      success: true,
      message: 'Ratings retrieved',
      code: 200,
      data: mappedData,
    });
  }

  async getRatingsByRaterId(req, res) {
    const payload = { ...req.params };
    const validatedPayload = validator.validatePayload(ratingsSchema.getRatingsByRaterId, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.ratingsRepository.getRatingsByRaterId(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Ratings not found',
        code: 404,
      });
    }

    for (const rating of result.data) {
      const attachments = await this.ratingAttachmentsRepository.getRatingAttachmentsByRatingId({ rating_id: rating.id });
      rating.attachments = attachments.data;
    }

    const mappedData = result.data.map((rating) => ({
      id: rating.id,
      rater: rating.rater_id ? {
        id: rating.rater_id,
        profile_name: rating.rater_profile_name,
        profile_picture: rating.rater_profile_picture,
      } : null,
      ratee: rating.ratee_id ? {
        id: rating.ratee_id,
        profile_name: rating.ratee_profile_name,
        profile_picture: rating.ratee_profile_picture,
      } : null,
      rating: rating.rating,
      description: rating.description,
      created_at: rating.created_at,
      attachments: rating.attachments,
    }));

    return res.status(200).json({
      success: true,
      message: 'Ratings retrieved',
      code: 200,
      data: mappedData,
    });
  }

  async getRatingById(req, res) {
    const payload = { id: req.params.id };
    const validatedPayload = validator.validatePayload(ratingsSchema.getRatingById, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.ratingsRepository.getRatingById(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
        code: 404,
      });
    }

    const attachments = await this.ratingAttachmentsRepository.getRatingAttachmentsByRatingId({
      rating_id: validatedPayload.data.id,
    });

    const mappedData = {
      id: result.data[0].id,
      rater: result.data[0].rater_id ? {
        id: result.data[0].rater_id,
        profile_name: result.data[0].rater_profile_name,
        profile_picture: result.data[0].rater_profile_picture,
      } : null,
      ratee: result.data[0].ratee_id ? {
        id: result.data[0].ratee_id,
        profile_name: result.data[0].ratee_profile_name,
        profile_picture: result.data[0].ratee_profile_picture,
      } : null,
      rating: result.data[0].rating,
      description: result.data[0].description,
      created_at: result.data[0].created_at,
      attachments: attachments.data,
    };

    return res.status(200).json({
      success: true,
      message: 'Rating found',
      code: 200,
      data: mappedData,
    });
  }

  async getRateeAverageRating(req, res) {
    const payload = { ...req.params };
    const validatedPayload = validator.validatePayload(ratingsSchema.getRateeAverageRating, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.ratingsRepository.getRateeAverageRating(validatedPayload.data);
    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to get ratee average rating',
        code: 500,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ratee average rating retrieved',
      code: 200,
      data: {
        average_rating: parseFloat(result.data[0].average_rating),
      },
    });
  }
}

module.exports = RatingsController;
