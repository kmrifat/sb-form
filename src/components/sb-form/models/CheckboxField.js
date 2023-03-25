import BaseField from "./base";

/**
 * @typedef {Object} Option
 * @property {any} [value]
 * @property {string} [label]
 */

/**
 * @typedef {Object} CheckboxFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {any} [value]
 * @property {boolean} [required]
 * @property {boolean} [inline]
 * @property {Option[]} [options]
 * @property {Option} [option]
 */
class CheckboxField extends BaseField {
    /**
     * @param {CheckboxFieldProps} [props]
     */
    constructor(props = {}) {
        super(props);
        this.inline = props.inline ?? true
        this.options = props.options
        this.option = props.option
        this.isMultiple = props.options ? true : false
        this.type = 'checkbox_field'
    }
}

export default CheckboxField