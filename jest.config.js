import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// jest.config.mjs
export default {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
};