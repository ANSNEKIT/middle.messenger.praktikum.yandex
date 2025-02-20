/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    globals: {},
    testEnvironment: "@bufbuild/jest-environment-jsdom",
    // testEnvironment: "jsdom",
    transform: {
        "^.+.ts?$": ["ts-jest",{}],
        "^.+\\.pcss$": "jest-css-modules-transform",
    },
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
    moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],
    moduleNameMapper: {
        '^@/(.*)': '<rootDir>/src/$1',
    },
    verbose: true,
};

