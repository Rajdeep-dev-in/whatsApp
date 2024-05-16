<template>
    <input 
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />

</template>
<script setup>
    const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
})

</script>