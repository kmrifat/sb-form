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
    constructor(props = {}) {
        super(props);
        this.type = 'date_field'
    }
}

export default DateField