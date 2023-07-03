export const validate = (rules, values) => {
  let errorObj = {};

  for (const errorKey in rules) {
    for (const rule of rules[errorKey]) {
      if (rule.required) {
        if (!!!values[errorKey]?.trim()) {
          errorObj[errorKey] = rule.message || "Vui lòng điền thông tin";
          break;
        }
      }

      if (rule.regex instanceof RegExp) {
        if (!rule.regex.test(values[errorKey])) {
          errorObj[errorKey] = rule.message;
          break;
        }
      }
    }
  }

  return errorObj;
};
