module.exports = {
  "extends": [
    "airbnb"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true,
  },
  "rules": {
    "consistent-return": "off", // ignores requiring explicit returns in every function
    "func-names": "off", // ignores requiring optional func names for anon fns (i.e. on class methods)
    "no-console": "off", // ignores console log warnings / errors
    "react/destructuring-assignment": "off", // ignores requiring destructuring when possible
    "react/jsx-filename-extension": "off", // ignores enforcing filetypes which may contain jsx
    // "react/jsx-wrap-multilines": "off",
    "import/no-unresolved": "off", // ignores errors for node modules since nms are in docker
  }
}