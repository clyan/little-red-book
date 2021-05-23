module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/env',
      {
        targets: {
          edge: '17',
          firefox: '40',
          chrome: '67',
          safari: '11.1',
        },
        useBuiltIns: 'usage',
        corejs: '3.6.4',
      },
    ],
  ];
  return {
    presets,
  };
};
