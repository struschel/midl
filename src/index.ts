
import { schedule } from 'node-cron';
import { saveProducts } from './api/SaveProducts';
import app from './App';
import { debug } from './utilities/Logger';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    debug.info(`App is running at http://localhost:${port}`);
});

/**
 * Save products every morning at 8
 */
schedule('0 8 * * *', () => saveProducts());
