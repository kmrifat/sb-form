import BaseField from "./base";

/**
 * @typedef {Object} StringFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class StringField extends BaseField {
    /**
     * @param {StringFieldProps} [props]
     */
    constructor({label, placeholder, col, error, value} = {}) {
        super();
        this.type = 'string'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
    }
}

export default StringField
