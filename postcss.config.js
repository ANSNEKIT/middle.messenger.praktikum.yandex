import postcssNesting from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default {
    map: false,
    plugins: [
        autoprefixer(),
        postcssNesting(),
        postcssPresetEnv(),
    ],
};