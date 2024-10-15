import express from 'express';
import path from 'path';

const PORT = 3000;
const app = express();

app.use(express.static('./dist'));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  
    res.status(200);
  });
  
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
