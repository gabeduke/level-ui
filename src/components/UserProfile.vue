<template>
    <div class="UserInfo" id="user-profile">
        <h2>User:</h2>
        <ul id="user-data" v-for="(value, name) in user" v-bind:key="name">
            {{ name }}: {{ value }}
        </ul>
    </div>

</template>

<script>
// import { db } from '../db'

// const users = firebase.collection('users')

export default {
    name: "User",
    props: ['id'],
    data() {
        return {
        user: null,
        }
    },

    watch: {
        id: {
        // call it upon creation too
        immediate: true,
        handler(id) {
            this.$bind('user', users.doc(id))
        },
        },
    },
}
</script>

<style scoped>

#user-profile {
  text-align: left;
}

</style>