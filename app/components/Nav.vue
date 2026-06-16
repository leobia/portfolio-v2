<script setup lang="ts">
const { data: settings } = await useSettings()

const open = ref(false)

function close() {
  open.value = false
}
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <a class="nav__logo" href="#top" @click="close">
        <span class="nav__avatar">
          <img src="/profile.png" alt="Leonardo Bianco" />
        </span>
        <span class="nav__wordmark">{{ settings?.nav.logo }}</span>
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
        class="nav__cta"
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
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.nav__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 68px;
  padding: 0 var(--pad-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav__logo {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  color: var(--ink);
}

.nav__avatar {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-round);
  overflow: hidden;
  background: var(--accent); // shows through the cutout, matches the per-load accent
}

.nav__avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  // Zoom the cutout so the figure fills the circle instead of floating in it.
  transform: scale(1.18);
  transform-origin: center 12%;
}

.nav__wordmark {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav__link {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: var(--muted);
  text-decoration: none;
  transition: color 150ms var(--ease);

  &:hover {
    color: var(--ink);
  }
}

.nav__cta {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  background: var(--ink);
  color: var(--paper);
  border-radius: var(--radius);
  padding: 10px 18px;
  text-decoration: none;
  transition: background 150ms var(--ease), transform 150ms var(--ease);

  &:hover {
    background: var(--accent);
  }

  &:active {
    transform: translateY(1px);
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

@media (max-width: 860px) {
  .nav__cta {
    margin-left: auto;
    margin-right: 12px;
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
    align-items: flex-start;
    gap: 0;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
    padding: 0 var(--pad-x);
    max-height: 0;
    overflow: hidden;
    transition: max-height 220ms var(--ease), padding 220ms var(--ease);
  }

  .nav__links--open {
    max-height: 340px;
    padding: 10px var(--pad-x) 20px;
  }

  .nav__link {
    padding: 13px 0;
    font-size: 14px;
  }

  .nav__wordmark {
    display: none; // avatar is the logo on small screens; full wordmark on desktop + footer
  }
}
</style>
