/**
 * ************************************
 *
 * @module  extraPropTypes
 * @author  boilerplate
 * @date    boilerplate
 * @description Custom prop typecheckers when prop-types can't cut it
 *
 * ************************************
 */

export default {
  /**
   * @method conditional
   * @param {callback} when - Receives all props, and should return true/false
   *   to indicate whether the current prop is required.
   * @param {string} ownType - Expected type of the prop if it is provided. As
   *   if you had set PropTypes[ownType] directly.
   */
  conditional({ when, ownType }) {
    return (props, propName, component) => {
      const suppliedType = typeof props[propName];

      // If condition is met, require the prop & check its type
      if (when(props) && suppliedType !== ownType) {
        return new Error(`Invalid prop ${propName} supplied to ${component}: Expected ${ownType} but received ${suppliedType}.`);
      }

      // If it has been passed in then check the type regardless
      if (suppliedType !== 'undefined' && suppliedType !== ownType) {
        return new Error(`Invalid (optional) prop ${propName} supplied to ${component}: Expected ${ownType} but received ${suppliedType}.`);
      }
    };
  },
};
