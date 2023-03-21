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
    constructor(props = {}) {
        super(props);
        this.type = 'string'
    }
}

export default EmailField