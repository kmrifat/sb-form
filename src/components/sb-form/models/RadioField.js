import BaseField from "./base";

/**
 * @typedef {Object} Option
 * @property {any} [value]
 * @property {string} [label]
 */

/**
 * @typedef {Object} RadioFieldProps
 * @property {string} [label]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {any} [value]
 * @property {boolean} [required]
 * @property {boolean} [inline]
 * @property {Option[]} [options]
 */
class RadioField extends BaseField {
    constructor({label, col, error, value, required, inline, options} = {}) {
        super();
        this.type = 'radio_field'
        this.label = label
        this.col = col
        this.error = error
        this.value = value
        this.required = required
        this.inline = inline ?? true
        this.options = options
    }
}

export default RadioField
