import BaseField from "./base";

/**
 * @typedef {Object} FileFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class MultiFileFiled extends BaseField {
    constructor({label, placeholder, col, error, value} = {}) {
        super();
        this.type = 'multi_file_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
    }
}

export default MultiFileFiled
