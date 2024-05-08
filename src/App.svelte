<script lang="ts">
  import { getAuthcode } from "$ts/server/authcode";
  import { getServer } from "$ts/server/multi";
  import { testConnection } from "$ts/server/test";
  import { onMount } from "svelte";
  import { ArcTerm } from "./ts/terminal/main";
  import { arcTermModeIntro } from "./ts/terminal/mode";
  import { arcCommands } from "./ts/terminal/store";

  let target: HTMLDivElement;
  let arcterm: ArcTerm;

  onMount(async () => {
    const server = getServer();

    if (server) {
      await testConnection(server, getAuthcode(server));
      // await rememberedLogin();
    }

    arcterm = new ArcTerm(target, arcCommands, arcTermModeIntro);
  });

  function focus() {
    if (!arcterm || !arcterm.input || !arcterm.input.current) return;

    arcterm.input.current.focus();

    if (!target) return;

    target.scrollTo(0, target.scrollHeight);
  }

  setInterval(focus, 10);
</script>

<div bind:this={target} class="terminal-renderer" />
