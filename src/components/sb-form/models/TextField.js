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
    /**
     * @param {TextFieldProps} [props]
     */
    constructor(props = {}) {
        super(props);
        this.type = 'text_field'
    }
}

export default TextField