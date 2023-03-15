const express = require('express');
const QRCode = require('qrcode');
const PORT = process.env.PORT || 3000;
const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//routes
app.get('/qrcode', (req, res) => {
        res.render('index');
    })
    //post qrcode information
app.post('/qrcode', async(req, res) => {
    const user = req.body;
    const qrcode = await QRCode.toString(`${user} `, {
        errorCorrectionLevel: 'H',
        type: 'svg'
    });
    try {
        res.render('code', { code: qrcode, user })
    } catch (error) {
        console.log(error);

    }
})
app.listen(PORT, () => console.log(`connected on port ${PORT}`));