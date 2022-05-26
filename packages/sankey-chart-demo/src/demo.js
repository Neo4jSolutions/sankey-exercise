import React from 'react';
import { render } from 'react-dom';
import { SankeyChart, DEFAULT_PROPS } from 'sankey-chart';

// Sample code showing how to load the JSON data for the exercise.
fetch('/data/sankey-data.json').then(response => response.json().then(loadedData => {
  console.log('data loaded by fetch: ', loadedData);
  setTimeout(() => {
    // using setTimeout inside fetch can be useful to test/debug loading state by forcing loading to take longer
  }, 5000);
}));

// Static data that needs to be replaced for the exercise.
const sampleData = [
  ["From", "To", "Weight"],
  ["Brazil", "Portugal", 4],
  ["Brazil", "France", 3],
  ["Brazil", "Spain", 2],
  ["Brazil", "England", 1],
  ["Canada", "Portugal", 1],
  ["Canada", "France", 4],
  ["Canada", "England", 3],
  ["Mexico", "Portugal", 2],
  ["Mexico", "France", 1],
  ["Mexico", "Spain", 5],
  ["Mexico", "England", 1],
  ["USA", "Portugal", 1],
  ["USA", "France", 1],
  ["USA", "Spain", 1],
  ["USA", "England", 5],
  ["Portugal", "Angola", 2],
  ["Portugal", "Senegal", 1],
  ["Portugal", "Morocco", 1],
  ["Portugal", "South Africa", 3],
  ["France", "Angola", 1],
  ["France", "Senegal", 3],
  ["France", "Mali", 3],
  ["France", "Morocco", 3],
  ["France", "South Africa", 1],
  ["Spain", "Senegal", 1],
  ["Spain", "Morocco", 3],
  ["Spain", "South Africa", 1],
  ["England", "Angola", 1],
  ["England", "Senegal", 4],
  ["England", "Morocco", 2],
  ["England", "South Africa", 7],
  ["South Africa", "China", 5],
  ["South Africa", "India", 1],
  ["South Africa", "Japan", 3],
  ["Angola", "China", 5],
  ["Angola", "India", 1],
  ["Angola", "Japan", 3],
  ["Senegal", "China", 5],
  ["Senegal", "India", 1],
  ["Senegal", "Japan", 3],
  ["Mali", "China", 5],
  ["Mali", "India", 1],
  ["Mali", "Japan", 3],
  ["Morocco", "China", 5],
  ["Morocco", "India", 1],
  ["Morocco", "Japan", 3]
];

// This is the function that tells React to render to the div with id "mount" in index.html
function renderApp() {
  let rootComponent = (
    <SankeyChart {...DEFAULT_PROPS} data={sampleData} />
  );

  render(rootComponent, document.getElementById('mount'));
}

renderApp();
