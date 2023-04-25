const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesDogs = require('./routesDogs')
const routesTemperaments = require('./routesTemperaments')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', routesDogs)
router.use('/temperaments', routesTemperaments)

module.exports = router;
