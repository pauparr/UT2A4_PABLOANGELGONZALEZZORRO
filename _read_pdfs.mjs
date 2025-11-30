import fs from 'fs';
import pdf from 'pdf-parse';

const files = [
    'Explicacion_UT2A4_CRUD_con_acceso_a_BD.pdf',
    'Guía para backend del Proyecto y uso de base de datos.pdf',
    'UT2A4 - CRUD con acceso a base de datos 25_26.pdf'
];

async function readPdfs() {
    for (const file of files) {
        console.log(`\n\n--- START OF ${file} ---\n`);
        try {
            const dataBuffer = fs.readFileSync(file);
            const data = await pdf(dataBuffer);
            console.log(data.text);
        } catch (error) {
            console.error(`Error reading ${file}:`, error.message);
            console.error(error);
        }
        console.log(`\n--- END OF ${file} ---\n`);
    }
}

readPdfs();
