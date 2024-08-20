class PromoController {
  constructor(promoRepository) {
    this.promoRepository = promoRepository;
  }

  async getPromo(req, res) {
    try {
      const promo = await this.promoRepository.getPromo();

      if (promo.error) {
        return res.status(404).json({
          success: false,
          message: 'Promo not found',
          code: 404,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'All promo successfully fetched',
        code: 200,
        data: promo.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        code: 500,
      });
    }
  }
}

module.exports = PromoController;
