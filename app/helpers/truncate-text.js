import { helper } from "@ember/component/helper";

export function truncateText(params /*, hash*/) {
  // return params;
  return params[0].substring(0, 25) + "...";
}

export default helper(truncateText);
