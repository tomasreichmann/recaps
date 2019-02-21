const colors = {
  paper: "#FCEDD0",
  paperDark: "#e5d6b9",
  text: "#444",
  textInverse: "#CCC",
  primary: "#E2410C",
  secondary: "#E78D00",
  woodLight: "#B79989",
  wood: "#7D5E4C",
  woodDark: "#594336",
  stoneLight: "#9B8E7B",
  stone: "#6B6559",
  stoneDark: "#444136"
};

const defaultFont = "Faustina, sans-serif";

const theme = {
  spacing: 8,
  typography: {
    body: {
      fontSize: "1em",
      lineHeight: "1.25",
      fontFamily: defaultFont,

      "@media (minWidth: 43.75em)": {
        fontSize: "1em",
        lineHeight: "1.375"
      }
    },

    h1: {
      fontSize: "2em",
      lineHeight: "1.25",
      fontFamily: defaultFont,
      fontWeight: 600,

      "@media (minWidth: 43.75em)": {
        fontSize: "2.5em",
        lineHeight: "1.125"
      },

      "@media (minWidth: 56.25em)": {
        fontSize: "3em",
        lineHeight: "1.05"
      }
    },

    h2: {
      fontSize: "1.625em",
      lineHeight: "1.15384615",
      fontFamily: defaultFont,
      fontWeight: 600,

      "@media (minWidth: 43.75em)": {
        fontSize: "2em",
        lineHeight: "1.25"
      },

      "@media (minWidth: 56.25em)": {
        fontSize: "2.25em",
        lineHeight: "1.25"
      }
    },

    h3: {
      fontSize: "1.375em",
      lineHeight: "1.13636364",
      fontFamily: defaultFont,
      fontWeight: 600,

      "@media (minWidth: 43.75em)": {
        fontSize: "1.5em",
        lineHeight: "1.25"
      },

      "@media (minWidth: 56.25em)": {
        fontSize: "1.75em",
        lineHeight: "1.25"
      }
    },

    h4: {
      fontSize: "1.125em",
      lineHeight: "1.11111111",
      fontFamily: defaultFont,
      fontWeight: 600,

      "@media (minWidth: 43.75em)": {
        fontSize: "1em",
        lineHeight: "1.22222222"
      }
    },

    blockquote: {
      fontSize: "1.25em",
      lineHeight: "1.25",
      fontFamily: defaultFont,

      "@media (minWidth: 43.75em)": {
        fontSize: "1.5em",
        lineHeight: "1.45833333"
      }
    }
  },
  colors
};

export default theme;
