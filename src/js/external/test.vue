<script>
export default {
    data() {
        return {
            msg: 'test'
        };
    }
};
</script>

<template>
    <h1>{{ msg }}</h1>
    <input v-model="msg" />
</template>
