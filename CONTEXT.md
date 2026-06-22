# Context

Glossary of domain terms for this project. Definitions only — no implementation details.

## Ticker

The bar at the top of the page (component `Ticker`). Historically an info marquee
showing rotating strings; now repurposed as the host for the **Runner** game. The
info strings are no longer displayed.

## Runner

The Chrome-dino-style mini-game living inside the Ticker. The player character is a
cat. Desktop-only: on touch devices the Runner is not playable.

## Idle

The Runner's resting state, before a session starts. The cat runs in place and a
**Play** control is offered (desktop only). No obstacles exist in Idle.

## Session

One play-through, from pressing Play to **Game Over** or exit. Page-scroll keys are
captured only while a Session is active.

## Jump / Roll

The two player actions during a Session.
- **Jump** — clears a **Ground obstacle**.
- **Roll** — a low dodge (the "duck") that clears a **Flying obstacle**.

## Ground obstacle / Flying obstacle

The two hazards. A **Ground obstacle** sits on the floor and must be jumped. A
**Flying obstacle** sits at head height and must be rolled under.

## Game Over

End of a Session, triggered by colliding with any obstacle. Shows the Session score
and the Record.

## Record

The best score ever achieved on this device. Persisted locally between visits. The
on-screen abbreviation is **HI**.
