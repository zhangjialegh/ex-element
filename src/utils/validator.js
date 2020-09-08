let idCardUtil = {
  provinceAndCitys: {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  },

  powers: [
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2",
    "1",
    "6",
    "3",
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2"
  ],
  parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],
  checkAddressCode: function(addressCode) {
    let check = /^[1-9]\d{5}$/.test(addressCode);
    if (!check) return false;
    if (idCardUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
      return true;
    } else {
      return false;
    }
  },
  checkBirthDayCode: function(birDayCode) {
    let check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(
      birDayCode
    );
    if (!check) return false;
    let yyyy = parseInt(birDayCode.substring(0, 4), 10);
    let mm = parseInt(birDayCode.substring(4, 6), 10);
    let dd = parseInt(birDayCode.substring(6), 10);
    let xdata = new Date(yyyy, mm - 1, dd);
    if (xdata > new Date()) {
      return false; // 生日不能大于当前日期
    } else if (
      xdata.getFullYear() === yyyy &&
      xdata.getMonth() === mm - 1 &&
      xdata.getDate() === dd
    ) {
      return true;
    } else {
      return false;
    }
  },
  getParityBit: function(idCardNo) {
    let id17 = idCardNo.substring(0, 17);
    let power = 0;
    for (let i = 0; i < 17; i++) {
      power += parseInt(id17.charAt(i), 10) * parseInt(idCardUtil.powers[i]);
    }
    let mod = power % 11;
    return idCardUtil.parityBit[mod];
  },
  checkParityBit: function(idCardNo) {
    let parityBit = idCardNo.charAt(17).toUpperCase();
    if (idCardUtil.getParityBit(idCardNo) === parityBit) {
      return true;
    } else {
      return false;
    }
  },
  checkIdCardNo: function(idCardNo) {
    // 15位和18位身份证号码的基本校验
    let check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
    if (!check) return false;
    // 判断长度为15位或18位
    if (idCardNo.length === 15) {
      return idCardUtil.check15IdCardNo(idCardNo);
    } else if (idCardNo.length === 18) {
      return idCardUtil.check18IdCardNo(idCardNo);
    } else {
      return false;
    }
  },
  // 校验15位的身份证号码
  check15IdCardNo: function(idCardNo) {
    // 15位身份证号码的基本校验
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(
      idCardNo
    );
    if (!check) return false;
    // 校验地址码
    let addressCode = idCardNo.substring(0, 6);
    check = idCardUtil.checkAddressCode(addressCode);
    if (!check) return false;
    let birDayCode = "19" + idCardNo.substring(6, 12);
    // 校验日期码
    return idCardUtil.checkBirthDayCode(birDayCode);
  },
  // 校验18位的身份证号码
  check18IdCardNo: function(idCardNo) {
    // 18位身份证号码的基本格式校验
    let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(
      idCardNo
    );
    if (!check) return false;
    // 校验地址码
    let addressCode = idCardNo.substring(0, 6);
    check = idCardUtil.checkAddressCode(addressCode);
    if (!check) return false;
    // 校验日期码
    let birDayCode = idCardNo.substring(6, 14);
    check = idCardUtil.checkBirthDayCode(birDayCode);
    if (!check) return false;
    // 验证校检码
    return idCardUtil.checkParityBit(idCardNo);
  }
};

const validator = {
  idCard(idCardNo) {
    return idCardUtil.checkIdCardNo(idCardNo);
  },
  mobile(mobile) {
    return /^1[3456789]\d{9}$/.test(mobile);
  },
  landline(landline) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(landline);
  },
  phone(phone) {
    return validator.mobile(phone) || validator.landline(phone);
  },
  positiveNumber(number) {
    return /^[1-9]\d*$/.test(number);
  },
  /**
   * 社会信用代码校验，18位
   * @param code
   * @returns {*}
   */
  socialCreditCode(code) {
    if (!code || code.length !== 18) {
      return false;
    }

    let baseCode = "0123456789ABCDEFGHJKLMNPQRTUWXY";
    let wt = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
    let total = 0;
    for (let i = 0; i < code.length - 1; i++) {
      total += baseCode.indexOf(code.substring(i, i + 1)) * wt[i];
    }
    let check = 31 - (total % 31);
    if (check === 31) {
      check = 0;
    }
    return baseCode.split("")[check] === code.substring(17, 18);
  },
  /**
   * 组织机构代码校验，10位
   * @param code
   * @returns {boolean}
   */
  orgCode(code) {
    if (!code || code.length !== 10) {
      return false;
    }
    let values = code.split("-");
    let ws = [3, 7, 9, 10, 5, 8, 4, 2];
    let str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let reg = /^([0-9A-Z]){8}$/;
    if (!reg.test(values[0])) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += str.indexOf(values[0].charAt(i)) * ws[i];
    }
    let C9 = 11 - (sum % 11);
    let YC9 = values[1] + "";
    if (C9 === 11) {
      C9 = "0";
    } else if (C9 === 10) {
      C9 = "X";
    } else {
      C9 = C9 + "";
    }
    return YC9 === C9;
  },
  /**
   * 营业执照注册码校验，15位
   * @param code
   * @returns {boolean}
   */
  bizLicenceCode(code) {
    if (!code || code.length !== 15) {
      return false;
    }
    let codeArray = (code + "").split("");
    let ti = 0;
    let si = 0;
    let cj = 0;
    let pj = 10;
    let lastNum = -1;
    for (let i = 0; i < codeArray.length; i++) {
      ti = parseInt(codeArray[i]);
      si = pj + ti;
      cj = (si % 10 === 0 ? 10 : si % 10) * 2;
      pj = cj % 11;
      if (i === codeArray.length - 1) {
        lastNum = si % 10;
      }
    }
    return lastNum === 1;
  },
  /**
   * 行业许可证注册码校验
   * @param code
   * @returns {boolean}
   */
  licenceCode(code) {
    return code && code.length <= 22;
  }
};

export default validator;
