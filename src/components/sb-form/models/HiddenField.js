import BaseField from "./base";

/**
 * @typedef {Object} HiddenFieldsProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {string} [value]
 */
class HiddenField extends BaseField {
    /**
     * @param {HiddenFieldsProps} [props]
     */
    constructor(props={label, placeholder, col, error, value}) {
        super(props);
        this.type = 'hidden_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
    }

}

export default HiddenField
