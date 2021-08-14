const express = require('express');
const router = express.Router();
const cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minutes');
        });
router.get('/cornapi', async (req, res) => {
    try {
        
        res.json({ message: 'le message affichié' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
})




module.exports = router;