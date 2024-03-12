import BaseField from "./base";


/**
 * @typedef {Object} AsyncSelectFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {string[] | number[] | Object[any]} [options]
 * @property {function} [axios]
 * @property {string} [fetchUrl]
 * @property {{value: string | number, default: string, help: string, display: string}} [config]
 */
class AsyncSelectField extends BaseField {
    /**
     * @param {AsyncSelectFieldProps} [props]
     */
    constructor({label, placeholder, col, error, options, axios, fetchUrl, config} = {}) {
        super();
        this.type = 'async_select_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.options = options || []
        this.fetchUrl = fetchUrl
        this.axios = axios
        this.config = config || {}
    }
}

export default AsyncSelectField
