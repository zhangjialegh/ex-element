<script>
import { TableColumn } from "element-ui";
import { columnFormatter } from "@/utils/ex";
export default {
  extends: TableColumn,
  name: "el-table-column",
  props: {
    formatType: String,
    dateFormat: String,
    formatter: {
      type: Function,
      default: columnFormatter
    }
  },
  methods: {
    /**
     * formatType: phone card dictionary
     */
    getPropsData(...props) {
      const arr = [...props, ["dateFormat", "formatType"]];
      return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach(key => {
            prev[key] = this[key];
          });
        }
        return prev;
      }, {});
    }
  }
};
</script>
