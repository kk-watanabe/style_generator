<script lang="ts">
  import Counter from "$lib/Counter.svelte";
</script>

<main>
  <h1>Hello world!</h1>

  <Counter />

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>
</main>

<style lang="scss">
  main {
      margin: 0 auto;
      padding: 1em;
      text-align: center;
    }

    h1 {
      margin: 4rem auto;
      max-width: 14rem;
      color: #ff3e00;
      text-transform: uppercase;
      font-weight: 100;
      font-size: 4rem;
      line-height: 1.1;
    }

    p {
      margin: 2rem auto;
      max-width: 14rem;
      line-height: 1.35;
    }

    @media (min-width: 480px) {
      h1 {
        max-width: none;
      }

      p {
        max-width: none;
      }
    }
</style>
