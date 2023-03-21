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
    constructor(props = {}) {
        super(props);
        this.type = 'file_field'
    }
}

export default FileFiled