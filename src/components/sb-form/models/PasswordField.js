import BaseField from "./base";

/**
 * @typedef {Object} PasswordFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class PasswordField extends BaseField {
    /**
     * @param {PasswordFieldProps} [props]
     */
    constructor(props = {label, placeholder, col, error}) {
        super(props);
        this.type = 'password'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
    }
}

export default PasswordField
