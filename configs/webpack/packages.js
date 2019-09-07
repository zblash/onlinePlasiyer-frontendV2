const externalPackages = (mode => [
  {
    npmName: 'react',
    cdnName: 'React',
    cdn:
      mode === 'dev'
        ? 'https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.development.js'
        : 'https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.production.min.js',
    integrity:
      mode === 'dev'
        ? 'sha256-sG+Edf9DLTFB5RDYOccWhs9wwYXjKzgFQUGW/NlwcoM='
        : 'sha256-YVstQvOjyS7WSJFWSugpQdLSbrXnb2651XXoUZIK81s=',
  },
  {
    npmName: 'react-dom',
    cdnName: 'ReactDOM',
    cdn:
      mode === 'dev'
        ? 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js'
        : 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js',
    integrity:
      mode === 'dev'
        ? 'sha256-I/ClrYyzlYEQkMUjqr7G3m/83znlycDCeI2xuBZsQx0='
        : 'sha256-qVsF1ftL3vUq8RFOLwPnKimXOLo72xguDliIxeffHRc=',
  },
  {
    npmName: 'axios',
    cdnName: 'axios',
    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js',
    integrity: 'sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=',
  },
  {
    npmName: 'react-router-dom',
    cdnName: 'ReactRouterDOM',
    cdn:
      'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.0.1/react-router-dom.min.js',
    integrity: 'sha256-FW22WiuVHRjHTl/Z0FHNNwNxhkyS2fTrPEzxIkIwd9M=',
  },
])('dev');

module.exports = externalPackages;
// module.exports = [];
