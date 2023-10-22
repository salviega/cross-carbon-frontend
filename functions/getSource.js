import fs from 'fs'
import path from 'path'

const travelPath = '../assets/scripts/functions/travel/source.js'
const groceryPath = '../assets/scripts/functions/grocery/source.js'

export function getSource(category) {
	console.log('11');
	switch (category) {
		case 'travel':
			return fs.readFileSync(path.resolve(__dirname, travelPath)).toString()
		case 'grocery':
			return fs.readFileSync(path.resolve(__dirname, groceryPath)).toString()
		default:
			return Error('Category not found')
	}
}
