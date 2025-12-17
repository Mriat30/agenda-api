module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['tests/features/**/*.ts'],
        paths: ['tests/features/**/*.feature']
    }
}