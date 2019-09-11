const externalPackages = (mode => {
  const isDev = mode === 'dev';
  if (isDev) {
    return [];
  }

  return [
    {
      npmName: 'react',
      cdnName: 'React',
      cdn: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.production.min.js',
      integrity: 'sha256-YVstQvOjyS7WSJFWSugpQdLSbrXnb2651XXoUZIK81s=',
    },
    {
      npmName: 'react-dom',
      cdnName: 'ReactDOM',
      cdn: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js',
      integrity: 'sha256-qVsF1ftL3vUq8RFOLwPnKimXOLo72xguDliIxeffHRc=',
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
      cdn: 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.0.1/react-router-dom.min.js',
      integrity: 'sha256-FW22WiuVHRjHTl/Z0FHNNwNxhkyS2fTrPEzxIkIwd9M=',
    },
    {
      npmName: 'classnames',
      cdnName: 'classNames',
      cdn: 'https://cdnjs.cloudflare.com/ajax/libs/classnames/2.2.6/dedupe.min.js',
      integrity: 'sha256-AD9AXdoluLycUjJeFYB3gfbpWo78fXS7OfVAIhBryZo=',
    },
  ];
})('dev');

module.exports = externalPackages;
