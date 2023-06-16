import BaseField from "./base";

/**
 * @typedef {Object} EmailFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class EmailField extends BaseField {
    /**
     * @param {EmailFieldProps} [props]
     */
    constructor(props = {label, placeholder, col, error, value}) {
        super(props);
        this.type = 'string'
        this.placeholder = placeholder || ''
        this.col = col
        this.error = error || null
        this.value = value
    }
}

export default EmailField