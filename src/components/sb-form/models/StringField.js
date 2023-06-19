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
    constructor(props = {label, placeholder, col, error}) {
        super(props);
        this.type = 'string'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
    }
}

export default StringField
