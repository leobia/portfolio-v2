<template>
  <footer class="footer">
    <span class="footer__credit">
      Designed with <a class="footer__link" href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Design</a>
      &middot; Built with <a class="footer__link" href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a>
    </span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 28px var(--pad-x) 40px;
  border-top: 1px solid var(--border-soft);
}

.footer__credit {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mono-faint);
}

.footer__link {
  color: var(--mono-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-tint-border);
  padding-bottom: 1px;
  transition: color 150ms ease;

  &:hover {
    color: var(--accent-text);
  }
}
</style>
