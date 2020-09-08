import Validator from "@/utils/validator";
import { isEmpty } from "element-ui/src/utils/util";
import { isDate } from "@/utils/types";

// 脱敏身份证
function idCardDesensitization(value) {
  return value
    ? value.replace(/^(.{3})(?:\d+)(.{3})$/, "$1************$2")
    : "";
}
// 脱敏电话号码
function phoneDesensitization(value) {
  if (!value) return "";
  let pat = "";
  if (Validator.mobile(value)) {
    pat = /(\d{3})\d*(\d{4})/;
    return value.replace(pat, "$1****$2");
  } else if (Validator.landline(value)) {
    pat = /(([0-9]{3,4}-)?)\d*([0-9]{3})/;
    return value.replace(pat, "$1****$3");
  } else {
    return value;
  }
}
// 时间格式化
class DataFormat {
  constructor(date) {
    this.date = isDate(date) ? date : new Date(date);
  }
  formate(formatStr = "YYYY-MM-DD HH:mm:ss") {
    const date = this.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const weeks = ["日", "一", "二", "三", "四", "五", "六"];
    return formatStr.replace(
      /Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}/g,
      match => {
        switch (match) {
          case "YY":
            return String(year).slice(-2);
          case "YYY":
          case "YYYY":
            return String(year);
          case "M":
            return String(month);
          case "MM":
            return String(month).padStart(2, "0");
          case "D":
            return String(day);
          case "DD":
            return String(day).padStart(2, "0");
          case "d":
            return String(week);
          case "dd":
            return weeks[week];
          case "ddd":
            return "周" + weeks[week];
          case "dddd":
            return "星期" + weeks[week];
          case "H":
            return String(hour);
          case "HH":
            return String(hour).padStart(2, "0");
          case "m":
            return String(minute);
          case "mm":
            return String(minute).padStart(2, "0");
          case "s":
            return String(second);
          case "ss":
            return String(second).padStart(2, "0");
          default:
            return match;
        }
      }
    );
  }
}

// 是否有汉字
export function hasHanzi(str) {
  return /[\u4e00-\u9fa5]+/.test(str);
}

// 逆驼峰
export function dasherize(str) {
  return str
    .replace(/(?!^)([A-Z])/g, "-$1")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase();
}

// 驼峰
export function camelize(str) {
  return str.replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : "";
  });
}

// 脱敏身份证和电话号码
export function desensitization(value) {
  if (isEmpty(value)) return "";
  if (Validator.phone(value)) {
    return phoneDesensitization(value);
  } else if (Validator.idCard(value)) {
    return idCardDesensitization(value);
  } else {
    return value;
  }
}

// 时间格式化

export function formatDate(date, str) {
  return new DataFormat(date).formate(str);
}
