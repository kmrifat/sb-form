import BaseField from "./base";

/**
 * @typedef {Object} FileFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class FileFiled extends BaseField {
    /**
     * @param {FileFieldProps} [props]
     */
    constructor(props = {label, placeholder, col, error}) {
        super(props);
        this.type = 'file_field'
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
    }
}

export default FileFiled
