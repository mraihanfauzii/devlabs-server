const validator = require('../../validator');
const themesSchema = require('../../validator/themes/themesSchema');

class ThemesController {
  constructor(themesRepository, themeClicksRepository) {
    this.themesRepository = themesRepository;
    this.themeClicksRepository = themeClicksRepository;
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

    for (const theme of themes.data) {
      const clicks = await this.themeClicksRepository.getClicksByThemeId({ theme_id: theme.id });
      theme.click_count = Number(clicks.data[0].clicks ?? 0);
    }

    return res.status(200).json({
      success: true,
      message: 'Themes found',
      code: 200,
      data: themes.data,
    });
  }

  async getThemeById(req, res) {
    const payload = { ...req.params, user_id: req.user.id };
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

    await this.themeClicksRepository.createThemeClick({
      theme_id: validatedPayload.data.id,
      user_id: validatedPayload.data.user_id,
    });

    const themeClicks = await this.themeClicksRepository.getClicksByThemeId({ theme_id: validatedPayload.data.id });
    theme.data[0].click_count = Number(themeClicks.data[0].clicks ?? 0);

    return res.status(200).json({
      success: true,
      message: 'Theme found',
      code: 200,
      data: theme.data[0],
    });
  }

  async getTrendingThemes(req, res) {
    const themes = await this.themesRepository.getTrendingThemes();
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
}

module.exports = ThemesController;
