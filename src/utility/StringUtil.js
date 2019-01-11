class StringUtil {
  mongoFieldIn(str) {
    return str.replace(/\./g, "{").replace(/\$/g, "}");
  }

  mongoFieldOut(str) {
    return str.replace(/{/g, ".").replace(/}/g, "$");
  }
}

module.exports = new StringUtil();
