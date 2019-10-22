<template>
    <section>
        <navigation></navigation>
            <b-card-group deck v-bind:columns="true">
                <b-card v-if="user" style="max-width: 30rem;" align="center">
                    <h5 class="b-card">{{ user.displayName }}</h5>
                    <b-img thumbnail fluid rounded="circle" :src="user.photoURL" alt="Circle image"></b-img>
                    <p class="b-card-text">
                        <br />email:
                        <strong>{{user.email}}</strong>
                        <br />uid:
                        <strong>{{user.uid}}</strong>
                        <br />provider:
                        <strong>{{user.providerData[0].providerId}}</strong>
                    </p>
                </b-card>
            </b-card-group>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebase from "firebase";
export default {
    data() {
        return {
            user: null
        };
    },
    components: {
        navigation
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            }
        });
    }
};
</script>

<style scoped>


</style>