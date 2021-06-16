module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
}
