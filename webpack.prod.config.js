const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [new CleanWebpackPlugin()], // delete this lane and uncomment 59 lzne in main config
};
