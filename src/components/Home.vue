<template>
    <section>
        <navigation></navigation>
        <h5 class="center-align">Home</h5>

        <Stations/>
        <Level/>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import Level from '@/components/Level.vue'
import Stations from '@/components/Stations.vue'

export default {
    data() {
        return {};
    },
    components: {
        navigation,
        Level,
        Stations,
    }
};
</script>

<style>
</style>