
module.exports = {
  process: () => {
    // return proxy object
    // this object will return the property name as a string
    // eg, styles.active = 'active'
    return `
    Object.defineProperty(exports, "__esModule", {
       value: true
    });
    
    const proxyConfig = {
      get: function(obj, prop) {
        return prop.toString();
      }
    };

    const p = new Proxy({}, proxyConfig);
    exports.default = p;
    `;
  }
};
