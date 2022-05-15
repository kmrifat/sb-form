<template>
    <div :class="fieldInfo.col ? 'col-'+fieldInfo.col : 'col-12'" class="password-field">
        <label class="form-label">{{ fieldInfo.label }} {{ fieldInfo.required ? '*' : '' }}</label>

        <input
            class="form-control"
            :class="fieldInfo.error ? 'is-invalid': ''"
            :type="show_pass ? 'text': 'password'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value);fieldInfo.error = false"
            :placeholder="fieldInfo.placeholder ? fieldInfo.placeholder : fieldInfo.label"
        />

        <button @click="toggleEye" class="btn-eye" tabindex="-1" type="button">
            <i :class="show_pass ? 'fas fa-eye': 'fas fa-eye-slash'"></i>
        </button>
        <div class="invalid-feedback">
            {{ fieldInfo.error ? fieldInfo.error[0] : '' }}
        </div>
    </div>

</template>

<script>
export default {
    name: "PasswordField",
    props: ['modelValue', 'fieldInfo'],
    emits: ['update:modelValue'],
    data() {
        return {
            show_pass: false
        }
    },
    methods: {
        toggleEye() {
            this.show_pass = !this.show_pass
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
