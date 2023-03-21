/**
 * @typedef {Object} BaseFiledProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class BaseField {
    /**
     *
     * @param {BaseFiledProps} [props]
     */
    constructor(props = {}) {
        this.label = props.label || '';
        this.placeholder = props.placeholder || '';
        this.col = props.col || null
        this.error = props.error || null
    }
}

export default BaseField