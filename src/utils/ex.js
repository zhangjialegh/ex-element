import { isEmpty } from "element-ui/src/utils/util";
import { isString } from "element-ui/src/utils/types";
import { desensitization, formatDate } from "@/utils/util";

// column 格式化
export function columnFormatter(row, col, value) {
  const { formatType, dateFormat } = col;
  let str = value;
  if (!isEmpty(formatType) && isString(formatType)) {
    switch (formatType) {
      case "desensitization":
        str = desensitization(value);
        break;
      case "date":
        str = formatDate(value, dateFormat);
        break;
    }
  }
  return str;
}
