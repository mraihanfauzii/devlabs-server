const validator = require('../../validator');
const themesSchema = require('../../validator/themes/themesSchema');

class ThemesController {
  constructor(themesRepository) {
    this.themesRepository = themesRepository;
  }

  async getAllThemes(req, res) {
    const themes = await this.themesRepository.getAllThemes();
    if (themes.error) {
      return res.status(404).json({
        success: false,
        message: 'Themes not found',
        code: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Themes found',
      code: 200,
      data: themes.data,
    });
  }

  async getThemeById(req, res) {
    const payload = { ...req.params };
    const validatedPayload = validator.validatePayload(themesSchema.getThemeById, payload);
    if (validatedPayload.error) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.error,
        code: 400,
      });
    }

    const theme = await this.themesRepository.getThemeById(validatedPayload.data);
    if (theme.error) {
      return res.status(404).json({
        success: false,
        message: 'Theme not found',
        code: 404,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Theme found',
      code: 200,
      data: theme.data[0],
    });
  }
}

module.exports = ThemesController;
