// Define a custom PropType that accepts a Vue component
import BaseField from "./base";

const VueComponentProp = {
    type: [Object, Function],
    validator: (value) => {
        if (typeof value === 'function') {
            // For Vue 2, check if the value is a Vue component constructor
            return typeof value.extend === 'function';
        } else {
            // For Vue 3, check if the value is a Vue component instance
            return typeof value.render === 'function';
        }
    },
};

/**
 * @typedef {Object} CustomFieldProps
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 * @property {VueComponentProp} [component]
 */
class CustomField extends BaseField {
    /**
     * @param {CustomFieldProps} [props]
     */
    constructor(props = {}) {
        super(props)
        this.component = props.component
        this.type = 'custom_field'
        this.title = props.title;
    }

}

export {CustomField, VueComponentProp}