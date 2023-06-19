import BaseField from "./base";

/**
 * @typedef {Object} FileFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class FileFiled extends BaseField {
    constructor({label, placeholder, col, error, value} = {}) {
        super();
        this.type = 'file_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
    }
}

export default FileFiled
