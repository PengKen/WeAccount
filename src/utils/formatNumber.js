/**
 * @desc 数值转换 1,000,000 vs 1000000
 */

var self ={};
// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
  //[progress,startValue,length,duration]
  return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
}
self.options = {
  useEasing: true, // toggle easing
  useGrouping: true, // 1,000,000 vs 1000000
  separator: ',', // character to use as a separator
  decimal: '.', // character to use as a decimal
  easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
  formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
  prefix: '', // optional text before the result
  suffix: '', // optional text after the result
  numerals: [] // optionally pass an array of custom numerals for 0-9
};
function formatNumber(num) {
  var neg = (num < 0),
    x, x1, x2, x3, i, len;
  num = Math.abs(num).toFixed(2);
  num += '';
  x = num.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? self.options.decimal + x[1] : '';
  if (self.options.useGrouping) {
    x3 = '';
    for (i = 0, len = x1.length; i < len; ++i) {
      if (i !== 0 && ((i % 3) === 0)) {
        x3 = self.options.separator + x3;
      }
      x3 = x1[len - i - 1] + x3;
    }
    x1 = x3;
  }
  // optional numeral substitution
  if (self.options.numerals.length) {
    x1 = x1.replace(/[0-9]/g, function(w) {
      return self.options.numerals[+w];
    })
    x2 = x2.replace(/[0-9]/g, function(w) {
      return self.options.numerals[+w];
    })
  }
  return (neg ? '-' : '') + self.options.prefix + x1 + x2 + self.options.suffix;
}

export default formatNumber