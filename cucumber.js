module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'tests/features/support/**/*.ts',
            'tests/features/steps-definitions/**/*.ts'
        ],
        paths: [
            'tests/features/**/*.feature'
        ],
        format: ['progress-bar', 'summary'],
        formatOptions: { snippetInterface: 'async-await' }
    }
}