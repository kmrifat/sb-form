# SB Form

#### Designed for Laravel + Vue Appliction

This form is design to build from a json, it will help us to develop application so rapidly that we don't need to worry
about form validation from design and file management

## Uses

To use Sb form you need to register the `Index.vue` to your `main.js`. <br>
or <br>
You can import `Index.vue` from the `sb-form` directory and use this component <br>

I register the SB Form alias to `sb-form` sp we can use it entire the application using `<sb-form/>` tag

### Supported Props

```json5
{
    props: {
        title: String,
        fields: Object,
        url: String,
        resetForm: {
            type: Boolean,
            default: true
        },
        callBack: {
            type: String,
            required: false
        }
    }
}
```

Currently, SB Form is support the listed props above. <br>
`title`, `fields` and `url` is required <br>
`callBack` will only execute on axios success
`resetForm` we can revoke from reset on edit/update <br>
The base (with all required props) db-form will look like this

```html

<sb-form title="Create User" :fields="fields" url="/create-user"/>
```

## Supported Fields

- [x] [Input Field](#input-field) `string`
- [x] [Password Field](#password-field) `password`
- [x] [Text Field](#text-field) `text_field`
- [x] [Single Select Field](#single-select-field) - Ajax Support need to add `select_field`
- [x] [Multiple Select Field](#multiple-select-field)
- [x] [File Field (Support File Upload)](#file-field) `file_field`

Scroll down more to get more information about the fields listed above

### Field Basic

Checkout the basic schema of json to generate a html field

```json5
{
    role: {
        label: 'Role',
        col: 6,
        type: 'select_field',
        value: 1,
        options: [
            {
                id: 1,
                name: 'Super Admin'
            },
            {
                id: 2,
                name: 'Role Two'
            }
        ],
        config: {
            value: 'id',
            display: 'name'
        }
    }
}
```

Name of the json attribute `role` will be considered as `v-model`
so you will see the same name in request payload.

`label` will be consider as your html label of the field

`col` bootstrap column. by default, it's `col-12`
so you can skip it if you don't want to change the column

`type` You need to define the [filed type](#supported-fields) here. by default, it will take `string`

`value` It will need in edit form when you like to preset data in `v-model`

`options` Only need in Select and Multiselect

`config` Currently it's also using in Select Field Only

### Input Field

```json5
{
    name: {
        label: "Full Name",
        placeholder: "Enter Full Name",
        col: 6,
        required: true
    }
}
```

### Text Field

```json5
{
    address: {
        label: "Address",
        col: 12,
        type: 'text_field'
    }
}
```

### Password Field

```json5
 {
    password: {
        label: "Password",
        col: 6,
        type: 'password',
        required: true
    }
}
```

### Single Select Field

```json5
{
    role: {
        label: 'Role',
        col: 6,
        type: 'select_field',
        value: 1,
        options: [
            {
                id: 1,
                name: 'Super Admin'
            },
            {
                id: 2,
                name: 'Role Two'
            }
        ],
        config: {
            value: 'id',
            display: 'name'
        }
    }
}
```

### Multiple Select Field
```json5
{
    permissions: {
        label: 'Permissions',
        type: 'multiselect_field',
        options: [
            {id:  1, name:  'Create User'}
        ],
        config: {
            value: (value) => value.id,
            display: (value) => value.name,
        },
        ajax: '/ajax-url'
    }
}
```

### File Field

```json5
{
    image: {
        label: 'User Image',
        type: 'file_field'
    }
}
```
