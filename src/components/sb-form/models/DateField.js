import BaseField from "./base";

/**
 * @typedef {Object} DateFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class DateField extends BaseField {
    /**
     *
     * @param {DateFieldProps} [props]
     */
    constructor({label, placeholder, col, error, value} = {}) {
        super();
        this.type = 'date_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
    }
}

export default DateField
