export default (value: any, options: any) => {
  if (value !== options.value) return options.message;
};
