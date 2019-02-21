import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import theme from "../theme";

const ThemePage = () => {
  console.log({ theme });
  return (
    <Layout>
      <SEO title="Téma" />
      <h1>Barvy</h1>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {Object.keys(theme.colors).map(colorKey => {
          const color = theme.colors[colorKey];

          return (
            <div
              css={{
                backgroundColor: color,
                height: 100,
                flex: `1 0 200px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              key={colorKey}
            >
              {colorKey}
            </div>
          );
        })}
      </div>

      <h1>Typografie</h1>

      <p>Výchozí Font: {theme.typography.body.fontFamily}</p>

      {Object.keys(theme.typography).map(typographyKey => {
        const typography = theme.typography[typographyKey];

        return (
          <div
            css={{
              ...typography
            }}
            key={typographyKey}
          >
            {typographyKey} ({typography.fontSize})
          </div>
        );
      })}

      <h1>Odsazení</h1>

      <p>Jednotka odsazení: {theme.spacing}px</p>
    </Layout>
  );
};

export default ThemePage;
