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
    constructor(props={}) {
        super(props);
        this.type = 'hidden_field'
    }

}

export default HiddenField