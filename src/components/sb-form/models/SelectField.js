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
 * @property {{value: string | number, default: string, help: string}} [config]
 */
class SelectField extends BaseField {
    /**
     * @param {SelectFieldProps} [props]
     */
    constructor(props = {}) {
        super(props);
        this.options = props.options || []
        this.fetchUrl = props.fetchUrl || null
        this.axios = props.axios
        this.config = props.config || {}
        this.type = 'select_field'
    }
}

export default SelectField