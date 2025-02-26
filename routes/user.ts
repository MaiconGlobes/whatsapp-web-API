/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
   res.send("route users");
});

export default router;