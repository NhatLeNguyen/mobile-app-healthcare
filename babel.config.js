module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['react-native-worklets-core/plugin'],
      ['@babel/plugin-syntax-jsx'],
      ['react-native-reanimated/plugin']
    ]
  };
};