const plugins = [
  require("@/plugins/ElFormItem").default,
  require("@/plugins/ElTableColumn").default
];
const exPlugins = [];

export default {
  install(Vue, { plugin = true } = {}) {
    let comps = exPlugins;
    if (plugin) {
      comps = [...exPlugins, ...plugins];
    }
    comps.forEach(cmp => {
      Vue.component(cmp.name, cmp);
    });
  }
};
