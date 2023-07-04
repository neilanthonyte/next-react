import * as _ from "lodash";

export default _.times(30, () => {
  return [_.random(40, 120), _.random(40, 180)];
});
