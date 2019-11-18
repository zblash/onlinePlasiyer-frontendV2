const svgoPlugins = [
  { cleanupIDs: true },
  { cleanupListOfValues: true },
  { cleanupNumericValues: true },
  { collapseGroups: true },
  { convertColors: true },
  { convertPathData: false },
  { convertStyleToAttrs: true },
  { convertTransform: true },
  { mergePaths: true },
  { minifyStyles: true },
  { removeComments: true },
  { removeDesc: { removeAny: true } },
  { removeDoctype: true },
  { removeEditorsNSData: true },
  { removeEmptyAttrs: true },
  { removeEmptyContainers: true },
  { removeEmptyText: true },
  { removeMetadata: true },
  { removeNonInheritableGroupAttrs: true },
  { removeTitle: true },
  { removeUnknownsAndDefaults: true },
  { removeUnusedNS: true },
  { removeUselessDefs: true },
  { removeUselessStrokeAndFill: true },
  { removeXMLProcInst: true },
  { sortAttrs: true },
  { removeViewBox: false },
];

// Custom configuration to convert only some colors to currentColor.
const colorsToKeep = ['#FFFFFF', '#FFF', '#fff', 'white', 'none'];
const shouldReplaceColor = color => !colorsToKeep.includes(color);
const svgConvertColorsOptions = {
  convertColors: {
    currentColor: { exec: shouldReplaceColor },
  },
};

// Image loader, Optimizes SVG and replaces by currentColor.
const svgCurrentColorLoader = {
  loader: 'image-webpack-loader',
  options: {
    svgo: {
      enabled: true,
      plugins: [...svgoPlugins, svgConvertColorsOptions],
    },
  },
};

// Add metadata to SVGs.
const forkSvgLoaderTransform = attributes => {
  // Nothing to do if we don't have a viewbox.
  if (!attributes.viewBox) return attributes;

  // Otherwise, extract the dimensions and provide them as metadata.
  const [minX, minY, width, height] = attributes.viewBox.split(' ').map(Number);

  return {
    ...attributes,
    dimensionsFromViewbox: { minX, minY, width, height },
  };
};

const forkSvgLoader = {
  loader: 'fork-svg-loader',
  options: {
    transformAttributes: forkSvgLoaderTransform,
  },
};

function svgLoader() {
  return [
    {
      test: /\.svg$/,
      include: /src\/assets\/icons/,
      exclude: /src\/assets\/images/,
      use: [forkSvgLoader, svgCurrentColorLoader],
    },
  ];
}

module.exports = svgLoader;
