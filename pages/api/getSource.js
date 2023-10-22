import fs from 'fs';
import path from 'path';

const travelPath = path.join(process.cwd(), 'assets/scripts/functions/travel/source.js');
const groceryPath = path.join(process.cwd(), 'assets/scripts/functions/grocery/source.js');

export default function handler(req, res) {

    let content = '';
    switch (req.body.type) {
        case 'travel':
            content = fs.readFileSync(travelPath).toString();
            break;
        case 'grocery':
            content = fs.readFileSync(groceryPath).toString();
            break;
        default:
            return res.status(400).json({ error: 'Category not found' });
    }

    res.status(200).json({ content });
}