const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const paintingRoute = require("./paintingRoute.js");
const techniqueRoute = require("./techniqueRoute.js");
const artistRoute = require("./artistRoute.js");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
	res.send("funciona");
});

router.use("/painting", paintingRoute);
router.use("/technique", techniqueRoute);
router.use("/artist", artistRoute);
module.exports = router;
