class ProjectsController {
  constructor(promoRepository) {
    this.promoRepository = promoRepository;
  }
async getProjectsById(req, res) {
    const {id } = req.params
    
    const promo = await this.promoRepository.getPromo();
    
    if (projects.error) {
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
  }
}