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
class MultiselectField extends BaseField {
    /**
     * @param {MultiSelectProps} [props]
     */
    constructor(props = {}) {
        super(props);
        this.options = props.options || []
        this.fetchUrl = props.fetchUrl || null
        this.axios = props.axios
        this.config = props.config || {}
        this.type = 'multiselect_field'
    }
}

export default MultiselectField