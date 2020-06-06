const extractor = require('@microsoft/api-extractor')
const execa = require('execa')
const env = 'production'

run()

async function run() {
    await execa(
        'rollup',
        [
            '-c',
            'configs/rollup.config.prod.js',
            '--environment',
            [`NODE_ENV:${env}`, 'formats:umd', 'SOURCE_MAP:true', 'PROD_ONLY:true', 'TYPES:true', 'LEAN:true']
                .filter(Boolean)
                .join(',')
        ],
        {
            stdio: 'inherit'
        }
    )
}
