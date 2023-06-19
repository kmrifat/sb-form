import BaseField from "./base";

/**
 * @typedef {Object} TextFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {string} [value]
 */
class TextField extends BaseField {
    constructor({label, placeholder, col, error, value} = {}) {
        super();
        this.type = 'text_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
    }
}

export default TextField