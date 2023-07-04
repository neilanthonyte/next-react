import axios from "axios";

export default (value: any, options: any) => {
  if (value === "" || value === null || value === undefined) {
    return Promise.resolve();
  }
  return new Promise(function (resolve: any) {
    axios
      .post(options.url, { value })
      .then((res) => res.data)
      .then((data) => {
        if (!data.isValid) {
          return resolve(options.message);
        }
        resolve();
      });
  });
};
