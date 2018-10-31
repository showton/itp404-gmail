import { helper } from "@ember/component/helper";

export function truncateText(params /*, hash*/) {
  // return params;
  return params[0].substring(0, 15) + "...";
}

export default helper(truncateText);
