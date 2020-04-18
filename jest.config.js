// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',
	// The test environment that will be used for testing
	testEnvironment: 'node',
	// The glob patterns Jest uses to detect test files
	testMatch: ['**/tests/**/?(*.)+(spec|test).js'],
	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: ['/node_modules/', '/src/', '/lib/', '/coverage/'],
};
