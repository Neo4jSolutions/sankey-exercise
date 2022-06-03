# Neo4j Solutions Sankey Chart Excercise

This repository contains a functioning React web app that displays a sankey chart.

## Installation

1.  Clone this repo
2.  Install yarn globally (not required but recommended): `brew install yarn` or `npm install -g yarn`
3.  Install project dependencies: `yarn install`

Note, this repository is a monorepo managed by yarn and won't work properly with npm.

### Running

Run `yarn start` and point your web browser to `http://localhost:8585`.

(port number can be changed in webpack config if needed)

### Tasks

The exercise involves making a few improvements to the React demo app.

### Data Loading Task

The sankey chart in the demo app is currently showing static / hard-coded data.

There is a JSON file available at `http://localhost:8585/data/sankey-data.json` which we want to load and display in the sankey chart. Its format is slightly different from the hard-coded data, so your solution will need to account for this.

Modify the demo so that the chart displays the data from this file instead of the static / hard-coded data. 

There should be a loading indicator of some kind in the UI while the data is loading.

### Color Theme Task

We'd like to support color theming for the chart. There should be a toggle setting added to the UI that allows users to switch between the existing color scheme, and an arbitrary color scheme of your choice.

An example that we can use for this alternate color scheme can be found here: https://github.com/d3/d3-scale-chromatic#schemeCategory10

### Style Task

The React demo app currently shows the chart and nothing else.

Imagine that we are planning to show a demo of this chart to a client, so we want to make it look a little more polished.

We know that the data contains "Trade Flow data between countries", so let's display this as a title somewhere above the chart, and add some other styling that will make the chart look more presentable.

You can use CSS, JavaScript (including npm packages) to implement the styling, but it should be done in such a way that all charts will be styled the same way since we anticipate using this chart component to display multiple charts with different data.

You can make changes to the options passed to the sankey chart itself if you wish, and for bonus points you could even try swapping out react-google-charts for some other charting library.

### Dashboard Task

The React demo app currently renders only a single sankey chart component.

Let's create a dashboard component that will render two sankey charts, each with their own, possibly different title, theme & data.

There are no constraints on how the two charts should be displayed in the dashboard except that it should be possible to view them both at the same time in a way that best shows the content to the user.

Since we will need a second url to load the data for the second chart, you can use `http://localhost:8585/data/sankey-data-2.json` or place your own file in the `/packages/sankey-chart-demo/data` directory and use `http://localhost:8585/data/<your-filename-here>`.

For bonus points, you can even use some arbitrary external url of your choice to load the data for one or both of the charts.

### Submitting Your Solution

Your solution to the exercise should be runnable with the steps outlined above.

You can create a Pull Request against this repo to submit your solution, or you can email it as a zip file if you prefer.

Note that if you send a zip file, please run `yarn clean` in the root of the repository to clean out all installed packages before creating the zip as this will make it substantially smaller.

