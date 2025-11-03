import { Router } from "express";
import { 
    getHikingSitesByRegion, 
    createHikingSite, 
    deleteHikingSite 
} from "../controllers/hiking-sites/controller";
import { 
    hikingSitesByRegionValidator, 
    createHikingSiteValidator,
    deleteHikingSiteValidator
} from "../controllers/hiking-sites/validator";
import paramValidation from "../middlewares/param-validation";
import validation from "../middlewares/validation";

const router = Router();

// GET /hiking-sites/by-region/:regionId - Get hiking sites by region
router.get('/by-region/:regionId', 
    paramValidation(hikingSitesByRegionValidator), 
    getHikingSitesByRegion
);

// POST /hiking-sites - Create a new hiking site
router.post('/', 
    validation(createHikingSiteValidator), 
    createHikingSite
);

// DELETE /hiking-sites/:id - Delete a hiking site
router.delete('/:id', 
    paramValidation(deleteHikingSiteValidator), 
    deleteHikingSite
);

export default router;

