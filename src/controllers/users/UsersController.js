const validator = require('../../validator');
const usersSchema = require('../../validator/users/usersSchema');
const { comparePassword } = require('../../utils/hashPassword');
const jwtToken = require('../../auth/jwtToken');

class UsersController {
  constructor(usersRepository, storageRepository) {
    this.usersRepository = usersRepository;
    this.storageRepository = storageRepository;
  }

  async register(req, res) {
    const payload = { ...req.body };
    const validatedPayload = validator.validatePayload(usersSchema.registerUser, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const isEmailExist = await this.usersRepository.getUserByEmail(validatedPayload.data);
    if (isEmailExist.data) {
      return res.status(400).json({
        success: false,
        message: 'Email already exist',
        code: 409,
      });
    }

    const result = await this.usersRepository.registerUser(validatedPayload.data);

    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to register user',
        code: 500,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'User successfully registered',
      code: 201,
      data: result.data[0],
    });
  }

  async login(req, res) {
    const payload = { ...req.body };
    const validatedPayload = validator.validatePayload(usersSchema.loginUser, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const result = await this.usersRepository.getUserByEmailAndRole(validatedPayload.data);

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
        code: 400,
      });
    }

    const isPasswordMatch = await comparePassword(validatedPayload.data.password, result.data[0].password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
        code: 400,
      });
    }
    const userData = result.data[0];
    delete userData.password;
    const accessToken = jwtToken.generateAccessToken(userData);

    return res.status(200).json({
      success: true,
      message: 'User successfully logged in',
      code: 200,
      data: {
        accessToken,
      },
    });
  }

  async getAllUsers(req, res) {
    const result = await this.usersRepository.getAllUsers();

    result.data.forEach((user) => {
      delete user.password;
    });

    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'Users not found',
        code: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'All users successfully fetched',
      code: 200,
      data: result.data,
    });
  }

  async getUserByToken(req, res) {
    const payload = { id: req.user.id };

    const result = await this.usersRepository.getUserById(payload);
    if (result.error) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 404,
      });
    }

    delete result.data[0].password;

    return res.status(200).json({
      success: true,
      message: 'User successfully fetched',
      code: 200,
      data: result.data[0],
    });
  }

  async updateUserProfile(req, res) {
    const payload = {
      id: req.user.id,
      ...req.body,
      profile_picture: req.files.filter((file) => file.fieldname === 'profile_picture'),
    };

    const validatedPayload = validator.validatePayload(usersSchema.updateUserProfile, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const user = await this.usersRepository.getUserById({ id: req.user.id });
    if (user.error) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 404,
      });
    }

    if (user.data[0].profile_picture) {
      const profilePicturePath = user.data[0].profile_picture.split('/');
      const profilePictureFileName = profilePicturePath[profilePicturePath.length - 1];
      await this.storageRepository.deleteFile(profilePictureFileName, 'profile_pictures');
    }

    if (validatedPayload.data.profile_picture.length === 0) {
      validatedPayload.data.profile_picture = null;
    } else {
      const fileData = validatedPayload.data.profile_picture[0].buffer;
      const originalFileName = validatedPayload.data.profile_picture[0].originalname;
      const timestamp = Date.now();
      const fileName = `${timestamp}_${originalFileName}`;

      const fileSaveResult = await this.storageRepository.saveFile(
        fileData,
        fileName,
        'profile_pictures',
        'api/v1/users/profile-pictures',
      );

      if (!fileSaveResult) {
        return res.status(500).json({
          success: false,
          message: 'Failed to save file',
          code: 500,
        });
      }

      validatedPayload.data.profile_picture = fileSaveResult;
    }

    const result = await this.usersRepository.updateUserProfile(validatedPayload.data);
    if (result.error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update user profile',
        code: 500,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User profile successfully updated',
      code: 200,
      data: result.data[0],
    });
  }
}

module.exports = UsersController;
