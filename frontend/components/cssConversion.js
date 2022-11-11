export const cssNameConversion = {
  flexWrap: "flex-wrap",
  justifyContent: "justify-content",
  height: "height",
  alignContent: "align-content",
  bgColor: "background-color",
  fColor: "color",
  borderRadius: "border-radius",
  margin: "margin",
  borderColor: "border-color",
  fontSize: "font-size",
  fontWeight: "font-weight",
  padding: "padding",
  width: "width",
  templateRows: "grid-template-rows",
};

export const styleGenerator = (props) => {
  const styleBlock = [];
  Object.entries(props).map(([key, value]) => {
    if (typeof value !== "undefined")
      if (cssNameConversion.hasOwnProperty(key))
        styleBlock.push(cssNameConversion[key] + `:` + value);
  });

  return styleBlock.join("; ") + ";";
};
