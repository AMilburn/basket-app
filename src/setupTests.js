const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
// Set up the adapter to be used by Enzyme in tests
Enzyme.configure({ adapter: new EnzymeAdapter() });

global.fetch = require('jest-fetch-mock')