import BaseField from "./base";

/**
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class PasswordField extends BaseField {

    constructor({label, placeholder, col, error, value} = {}) {
        super();
        this.type = 'password'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
    }
}

export default PasswordField
