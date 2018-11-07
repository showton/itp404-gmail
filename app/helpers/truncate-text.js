import { helper } from "@ember/component/helper";

export function truncateText(params /*, hash*/) {
  // return params;
  let text = params[0];
  let length = params[1];

  if (text.length < length) {
    return text;
  } else {
    return text.substring(0, length) + "...";
  }
}

export default helper(truncateText);
