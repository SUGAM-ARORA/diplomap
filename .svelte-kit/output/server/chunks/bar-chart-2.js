import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
const Bar_chart_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "18",
        "x2": "18",
        "y1": "20",
        "y2": "10"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "20",
        "y2": "4"
      }
    ],
    [
      "line",
      {
        "x1": "6",
        "x2": "6",
        "y1": "20",
        "y2": "14"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bar-chart-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export {
  Bar_chart_2 as B
};
