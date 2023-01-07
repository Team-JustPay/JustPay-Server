import { Router } from 'express';

import { suggestController } from '../controller';

const router: Router = Router();

router.get('/:suggestId/shippingInfo', suggestController.getShippingInfo);

export default router;
