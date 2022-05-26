const path = require('path');
const fs = require('fs');

const webpackConfig = require('./webpack.config');

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getCurrentDirectoryName = () => 
  __dirname.substring(path.join(__dirname, '../').length);

const currentPackage = getCurrentDirectoryName();
const packages = getDirectories(path.join(__dirname, '../')).filter(package => package !== currentPackage);

const scopePrefix = '';

const localPackages = packages.reduce((lp, p) => {
  lp[scopePrefix + p] = {
    rootPath: '../' + p,
    entry: {
      srcPath: 'src',
      entryFile: p + '.js'
    }
  };
  return lp;
}, {});

const basePath = process.cwd();

const modulePackages = [path.join(basePath, '../../node_modules')];

const description = 'Local Packages Map';
const babelCacheDirectory = true;
const jsRegexp = /\.jsx?$/;

const packageToEntryFileMap = {};
const packageToSrcPathMap = {};

let stats;
let foundSrcPath;
let foundEntryFile;
let allFound = true;

for (let packageName of Object.keys(localPackages)) {
  const packageObject = localPackages[packageName];

  const { rootPath, entry } = packageObject;
  if (entry !== undefined) {
    const { srcPath, entryFile } = entry;
    const localSrcPath = path.join(rootPath || '', srcPath || '');
    const localEntryFile = path.join(localSrcPath, entryFile);
    try {
      foundSrcPath = path.resolve(basePath, localSrcPath);
      foundEntryFile = path.resolve(basePath, localEntryFile);
      stats = fs.statSync(foundEntryFile);
      if (stats.isDirectory() || stats.isFile()) {
        packageToEntryFileMap[packageName] = foundEntryFile;
        packageToSrcPathMap[packageName] = foundSrcPath;
        console.log(description + ' - resource found: ', packageName, foundEntryFile);
      } else {
        console.warn(description + ' - resource was not a file or directory: ', packageName, localEntryFile);
        allFound = false;
      }
    } catch (error) {
      console.warn(description + ' - error loading resource: ', packageName, localEntryFile);
      allFound = false;
    }
  }
}
if (!allFound) {
  console.warn(description + ' - base path for the above errors was: ', basePath);
  process.exit(1);
}

let resolve = webpackConfig.resolve || {};

resolve = {
  ...resolve,
  modules: [...(resolve.modules || []), ...modulePackages],
  alias: { ...(resolve.alias || {}), ...packageToEntryFileMap }
};

let rules = (webpackConfig.module.rules ? webpackConfig.module.rules : []).slice();

for (let packageName of Object.keys(packageToSrcPathMap)) {
  let packageSrcPath = packageToSrcPathMap[packageName];

  let options = {
    // babelrcRoots: packageSrcPath,
    cacheDirectory: babelCacheDirectory,
    configFile: path.join(__dirname, '../../babel.config.js')
  };
  let include = packageSrcPath;

  // const localPackage = localPackages[packageName];
  // if (localPackage && localPackage.entry && !localPackage.entry.srcPath) {
  //   options = {
  //     babelrc: false,
  //     cacheDirectory: babelCacheDirectory
  //   };
  //   include = path.join(basePath, packageSrcPath);
  // }
  rules.push(
    {
      test: jsRegexp,
      loader: 'babel-loader',
      options: options,
      include: include
    }
  );
}

webpackConfig.resolve = resolve;
webpackConfig.module.rules = rules;

console.log(JSON.stringify(webpackConfig, null, '  '));

module.exports = webpackConfig;