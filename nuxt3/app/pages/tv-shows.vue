<script setup>
const route = useRoute()
await navigateTo({ path: '/tv/popular', query: route.query })
</script>
