module.exports = {
    entry: './src/index.ts',
    output: {
        filename: "main.js"
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};
