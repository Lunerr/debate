class NumberUtil {
  secondsToMs(input) {
    return input * 1000;
  }

  hoursToMs(input) {
    return input * 3600000;
  }

  daysToMs(input) {
    return input * 86400000;
  }

  msToTime(input) {
    return {
      milliseconds: parseInt(input % 1000 / 100),
      seconds: parseInt(input / 1000 % 60),
      minutes: parseInt(input / (1000 * 60) % 60),
      hours: parseInt(input / (1000 * 60 * 60) % 24),
      days: parseInt(input / (1000 * 60 * 60 * 24))
    };
  }

  pad(num, size) {
    let s = num.toString();

    while (s.length < size)
      s = `0${s}`;

    return s;
  }

  round(num, dec) {
    return typeof dec === "number" ? Number(num.toFixed(dec)) : Math.round(num);
  }
}

module.exports = new NumberUtil();
