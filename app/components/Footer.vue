<template>
    <footer class="footer">
        <span class="footer__mark">Leonardo Bianco</span>
        <span class="footer__credit">
            Designed with
            <a
                class="footer__link"
                href="https://www.tasteskill.dev/"
                target="_blank"
                rel="noopener noreferrer"
                >Taste</a
            >, Built with
            <a
                class="footer__link"
                href="https://claude.com/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                >Claude Code</a
            >
        </span>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 36px var(--pad-x) 48px;
    border-top: 1px solid var(--line);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
}

.footer__mark {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.footer__credit {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.02em;
    color: var(--muted);
}

.footer__link {
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--accent-line);
    transition: color 150ms var(--ease);

    &:hover {
        color: var(--accent-ink);
    }
}
</style>
