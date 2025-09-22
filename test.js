/**
 * Minimal Test Case for domSelector linearGradient Bug
 * 
 * This test demonstrates a bug in the domSelector library where
 * querySelector cannot find linearGradient elements in SVG.
 */

// Import required modules
const { JSDOM } = require('jsdom');
const { DOMSelector } = require('@asamuzakjp/dom-selector');

// Create a minimal SVG with linearGradient
const html = `
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="test-gradient">
      <stop offset="0%" stop-color="red"></stop>
      <stop offset="100%" stop-color="blue"></stop>
    </linearGradient>
  </defs>
  <rect fill="url(#test-gradient)" />
</svg>
`;

// Create a virtual DOM using jsdom
const dom = new JSDOM(html);
const document = dom.window.document;

// Helper function to log test results
function logResult(testName, element) {
  console.log(`\n${testName}:`);
  console.log(`  Result: ${element ? 'FOUND' : 'NOT FOUND'}`);
  if (element) {
    console.log(`  Element: <${element.tagName.toLowerCase()}${element.id ? ` id="${element.id}"` : ''}>`);
  }
}

console.log('=== domSelector linearGradient Bug Test ===');

// Test 1: Native querySelector (should work)
const nativeResult = document.querySelector('linearGradient');
logResult('Native querySelector', nativeResult);

// Test 2: domSelector library (has bug)
const domSelectorInstance = new DOMSelector(dom.window);
const domSelectorResult = domSelectorInstance.querySelector('linearGradient', document);
logResult('domSelector querySelector', domSelectorResult);

// Test 3: Control test - direct DOM traversal (always works)
const svg = document.querySelector('svg');
const defs = svg.querySelector('defs');
const linearGradient = defs.firstElementChild;
logResult('Direct DOM traversal', linearGradient);

// Summary
console.log('\n=== Summary ===');
console.log('Bug confirmed: ' + (nativeResult && !domSelectorResult ? 'YES' : 'NO'));
console.log('The domSelector library cannot find linearGradient elements in SVG using querySelector,');
console.log('even though the native querySelector and direct DOM traversal can find them.');