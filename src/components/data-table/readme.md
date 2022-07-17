# Data table

```html

<data-table url="/roles" :columns="columns">
```

```js

columns: [
    {label: 'Name', field: 'name', searchable: true},
    {label: 'Guard Name', field: 'guard_name', searchable: true},
    {label: 'Actions', field: 'actions'}
]

```

Customize Column using slot

```html

<data-table url="/roles" :columns="columns">
    <template v-slot:actions="{item}">
        Your custom html tags
    </template>
</data-table>
```

Customize table header

```html

<data-table url="/roles" :columns="columns">
    <template v-slot:tableHeader>
                
    </template>
</data-table>
```
