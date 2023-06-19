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
    constructor({label, placeholder, col, error, value, required, inline, options, option} = {}) {
        super();
        this.type = 'checkbox_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
        this.required = required
        this.inline = inline ?? true
        this.options = options
        this.option = option
        this.isMultiple = !!options
    }
}

export default CheckboxField
