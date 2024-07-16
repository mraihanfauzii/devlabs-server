const validator = require('../../validator');
const messagesSchema = require('../../validator/messages/messagesSchema');

class MessagesController {
  constructor(messagesRepository, usersRepository) {
    this.messagesRepository = messagesRepository;
    this.usersRepository = usersRepository;
  }

  async createMessage(req, res) {
    const payload = { ...req.body, sender_id: req.user.id };
    const validatedPayload = validator.validatePayload(messagesSchema.createMessage, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const isReceiverExist = await this.usersRepository.getUserById({ id: validatedPayload.data.receiver_id });
    if (isReceiverExist.error) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found',
        code: 404,
      });
    }

    const result = await this.messagesRepository.createMessage(validatedPayload.data);
    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create message',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Message created',
      code: 201,
      data: result.data[0],
    });
  }

  async getMessagesBetweenUsers(req, res) {
    const payload = { ...req.query };
    const validatedPayload = validator.validatePayload(messagesSchema.getMessagesBetweenUsers, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const firstUser = await this.usersRepository.getUserById({ id: validatedPayload.data.first_user_id });
    if (firstUser.error) {
      return res.status(404).json({
        success: false,
        message: 'First user not found',
        code: 404,
      });
    }

    const secondUser = await this.usersRepository.getUserById({ id: validatedPayload.data.second_user_id });
    if (secondUser.error) {
      return res.status(404).json({
        success: false,
        message: 'Second user not found',
        code: 404,
      });
    }

    const result = await this.messagesRepository.getMessagesBetweenUsers(validatedPayload.data);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Messages not found',
        code: 404,
      });
    }

    const mappedData = result.data.map((message) => ({
      id: message.id,
      sender: message.sender_id ? {
        id: message.sender_id,
        profile_name: message.sender_profile_name,
        profile_picture: message.sender_profile_picture,
      } : null,
      receiver: message.receiver_id ? {
        id: message.receiver_id,
        profile_name: message.receiver_profile_name,
        profile_picture: message.receiver_profile_picture,
      } : null,
      message: message.message,
      created_at: message.created_at,
    }));

    return res.status(200).json({
      success: true,
      message: 'Messages found',
      code: 200,
      data: mappedData,
    });
  }
}

module.exports = MessagesController;
