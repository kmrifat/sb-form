import BaseField from "./base";

/**
 * @typedef {Object} EmailFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class EmailField extends BaseField {
    constructor({label, placeholder, col, error, value} = {}) {
        super()
        this.type = 'string'
        this.filedType = 'email'
        this.placeholder = placeholder || ''
        this.col = col
        this.error = error || null
        this.value = value
        this.label = label
    }
}

export default EmailField
