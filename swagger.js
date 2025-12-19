import swaggerAutoGen from 'swagger-autogen'

const outputFile = './swagger.json'
const endPointsFiles = ['./src/main.ts'];

const doc = {
    info: {
        title: 'API de agenda de turnos de masajes',
        description: 'Esta API permite agendar turnos para las personas y que ellas tambien lo gestionen'
    },
    host: 'localhost:3000',
    schemes: ['http'],
}

swaggerAutoGen()(outputFile, endPointsFiles,doc);