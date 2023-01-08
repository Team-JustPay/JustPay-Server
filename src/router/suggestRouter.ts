import { Router } from 'express';

import { suggestController } from '../controller';
import { auth } from '../middlewares';

const router: Router = Router();

router.get('/:suggestId/shippingInfo', suggestController.getShippingInfo);

router.delete('/:suggestId', auth, suggestController.deleteSuggest);

router.patch('/:suggestId/price', auth, suggestController.raisePrice);

router.patch('/:suggestId/invoice', auth, suggestController.updateInvoiceNumber);

router.patch('/:suggestId/status', auth, suggestController.updateStatus);

router.get('/:suggestId/payment', suggestController.getSuggestPaymentInfo);

router.get('/:suggestId', auth, suggestController.getSuggestDetail);

router.get('/:suggestId/invoice', auth, suggestController.getInvoiceInfo);

export default router;
