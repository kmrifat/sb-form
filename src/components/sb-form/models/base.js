/**
 * @typedef {Object} BaseFiledProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {any} [value]
 * @property {boolean} [required]
 */
class BaseField {
    constructor({label, placeholder, col, error, value} = {}) {
        this.label = label || '';
        this.placeholder = placeholder || '';
        this.col = col || null
        this.error = error || null
        this.value = value
    }
}

export default BaseField