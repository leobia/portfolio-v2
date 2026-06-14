<script setup lang="ts">
const { data: settings } = await useSettings()

const open = ref(false)

function close() {
  open.value = false
}
</script>

<template>
  <header class="nav">
    <a class="nav__logo" href="#top" @click="close">
      <span class="nav__bullet">●</span> {{ settings?.nav.logo }}
    </a>

    <nav class="nav__links" :class="{ 'nav__links--open': open }">
      <a
        v-for="link in settings?.nav.links"
        :key="link.href"
        class="nav__link"
        :href="link.href"
        @click="close"
      >{{ link.label }}</a>
    </nav>

    <a
      class="nav__contact"
      :href="settings?.nav.contact.href"
      @click="close"
    >{{ settings?.nav.contact.label }}</a>

    <button
      class="nav__toggle"
      type="button"
      :aria-expanded="open"
      aria-label="Toggle menu"
      @click="open = !open"
    >
      <span class="nav__toggle-bar" />
      <span class="nav__toggle-bar" />
      <span class="nav__toggle-bar" />
    </button>
  </header>
</template>

<style scoped lang="scss">
.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px var(--pad-x);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-soft-2);
}

.nav__logo {
  font-family: var(--font-mono);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
}

.nav__bullet {
  color: var(--accent);
}

.nav__links {
  display: flex;
  gap: 30px;
}

.nav__link {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mono-muted);
  text-decoration: none;
  transition: color 150ms ease;

  &:hover {
    color: var(--ink);
  }
}

.nav__contact {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-round);
  padding: 10px 20px;
  text-decoration: none;
  transition: background 150ms ease;

  &:hover {
    background: var(--accent-hover);
  }
}

.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
}

.nav__toggle-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--ink);
}

@media (max-width: 900px) {
  .nav__contact {
    margin-left: auto;
    margin-right: 14px;
  }

  .nav__toggle {
    display: flex;
  }

  .nav__links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-soft-2);
    padding: 0 var(--pad-x);
    max-height: 0;
    overflow: hidden;
    transition: max-height 200ms ease, padding 200ms ease;
  }

  .nav__links--open {
    max-height: 320px;
    padding: 12px var(--pad-x) 20px;
  }

  .nav__link {
    padding: 12px 0;
  }
}
</style>
