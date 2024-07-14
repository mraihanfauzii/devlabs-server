
class PaymentsController {
  constructor(PaymentsRepository) {
    this.PaymentsRepository = PaymentsRepository;
  }

  async getAllPaymentMethod(req, res) {
    const payment = await this.PaymentsRepository.getAllPaymentMethod();

    return res.status(200).send({
      success: true,
      message: 'Payment method found',
      code: 200,
      data: payment.data,
    });
  }

  async getAllPaymentMethodByID(req, res) {
    const id = req.params
    const payment = await this.PaymentsRepository.getAllPaymentMethodByID(id);

    return res.status(200).send({
      success: true,
      message: 'Payment method by id found',
      code: 200,
      data: payment.data[0],
    });
  }

}
module.exports = PaymentsController;