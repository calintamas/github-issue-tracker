import { defaultTheme } from '@backpacker/primitives';

import { colors } from './colors';

// When creating a new theme, make sure to include all color tokens from this 'base' theme
const colorTokens = {
  brand: colors.blue[500],
  lightBrand: colors.blue[200],
  lightBrandText: colors.blue[300],
  neutral: colors.gray[500],
  text: colors.black[100],
  invertedText: colors.gray[100],
  surface: colors.gray[100],
  background: colors.gray[200],
  border: colors.gray[200],
  red: colors.red[500],
  highlight: colors.yellow[300]
};

const textVariants = {
  largeTitle: {
    fontSize: 34
  },
  title1: {
    fontSize: 28
  },
  title2: {
    fontSize: 22
  },
  title3: {
    fontSize: 20
  },
  headline: {
    fontSize: 17
  },
  body: {
    fontSize: 16
  },
  callout: {
    fontSize: 16
  },
  subhead: {
    fontSize: 15
  },
  footnote: {
    fontSize: 13
  },
  caption1: {
    fontSize: 12
  },
  caption2: {
    fontSize: 11
  }
};

const baseTheme = {
  ...defaultTheme,
  colors: colorTokens,
  textVariants,
  padding: 20,
  isDark: false
};

export { baseTheme };
