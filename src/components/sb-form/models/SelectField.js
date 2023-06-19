import BaseField from "./base";


/**
 * @typedef {Object} SelectFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {string[] | number[] | Object[any]} [options]
 * @property {function} [axios]
 * @property {string} [fetchUrl]
 * @property {{value: string | number, default: string, help: string, display: string}} [config]
 */
class SelectField extends BaseField {
    /**
     * @param {SelectFieldProps} [props]
     */
    constructor({label, placeholder, col, error, options, axios, fetchUrl, config} = {}) {
        super();
        this.type = 'select_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.options = options || []
        this.fetchUrl = fetchUrl || null
        this.axios = axios
        this.config = config || {}
    }
}

export default SelectField
