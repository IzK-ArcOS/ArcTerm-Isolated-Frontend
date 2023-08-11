<script lang="ts">
  import { onMount } from "svelte";
  import { ArcTerm } from "./ts/terminal/main";
  import { arcCommands } from "./ts/terminal/store";
  import { arcTermModeIntro } from "./ts/terminal/mode";
  import { rememberedLogin } from "./ts/api/getter";
  import { testConnection } from "./ts/api/test";
  import { getServer } from "./ts/api/server";
  import { getAuthcode } from "./ts/api/authcode";

  let target: HTMLDivElement;
  let arcterm: ArcTerm;

  onMount(async () => {
    const server = getServer();

    if (server) {
      await testConnection(server, getAuthcode(server));
      await rememberedLogin();
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
