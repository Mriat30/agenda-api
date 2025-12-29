import swaggerAutoGen from 'swagger-autogen'
import versionData from './version.json' with { type: "json" };

const outputFile = './swagger.json'
const endPointsFiles = ['./src/main.ts', "./src/app.ts"];

const doc = {
    info: {
        title: 'API de agenda de turnos de masajes',
        description: 'Esta API permite agendar turnos para las personas y que ellas tambien lo gestionen',
        version: versionData.version,
    },
    schemes: ['http', 'https'],
}

swaggerAutoGen()(outputFile, endPointsFiles,doc);