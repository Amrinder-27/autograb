const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.get('/', (request, response) => {
    const status = {
       'Status': 'Running'
    };
    
    response.send(status);
 });
app.post('/upload', upload.single('logbook'), (req, res) => {
    const { make, model, badge } = req.body;
    const logbookContent = req.file.buffer.toString('utf-8');

    res.json({
        make,
        model,
        badge,
        logbookContent
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});