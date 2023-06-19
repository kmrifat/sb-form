import BaseField from "./base";

/**
 * @typedef {Object} MultiSelectProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {string[] | number[] | Object[any]} [options]
 * @property {function} [axios]
 * @property {string} [fetchUrl]
 * @property {{value: string | number, default: string, help: string, display: string}} [config]
 */
class MultiSelectField extends BaseField {
    /**
     * @param {MultiSelectProps} [props]
     */
    constructor(props = {label, placeholder, col, error, options, axios, fetchUrl, config}) {
        super(props);
        this.type = 'multiselect_field'
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

export default MultiSelectField
