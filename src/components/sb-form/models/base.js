/**
 * @typedef {Object} BaseFiledProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {any} [value]
 * @property {boolean} [required]
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
        this.value = props.value
    }
}

export default BaseField