module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['transform-inline-environment-variables'],
      // Reanimated plugin has to be listed last.
      'react-native-reanimated/plugin',
    ],
  };
}; 