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
    constructor(props = {}) {
        super(props);
        this.type = 'string'
    }
}

export default StringField