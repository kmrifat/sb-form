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
    constructor(props = {}) {
        super(props);
        this.type = 'password'
    }
}

export default PasswordField