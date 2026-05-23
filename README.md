# Sky Playground ☁

An interactive browser-based playground for the [Sky language](https://github.com/arthurmaciel/sky) —
built entirely in Sky itself, using `Sky.Live` and `Std.Ui`.

## Requirements

- [`sky`](https://github.com/arthurmaciel/sky) compiler on `$PATH`
- Go 1.21+

## Running locally

```bash
git clone <this-repo>
cd sky-playground
sky run
```

Then open **http://localhost:8080** in your browser.

## Features

- 6 built-in examples covering core Sky patterns
- **Format** — runs `sky fmt` on your code and replaces the editor content
- **Run** — runs `sky build && ./sky-out/app` in a sandboxed temp directory, streams output back
- **Security sandbox** — the following modules are blocked in the playground (detected client-side
  and stripped server-side before any build attempt):

  | Blocked module            | Reason                                     |
  |---------------------------|--------------------------------------------|
  | `File`, `Io`              | File-system access                         |
  | `Process`                 | Arbitrary subprocess execution             |
  | `System`                  | Environment / exit / CWD access            |
  | `Db`, `Auth`              | Database and authentication                |
  | `Http`                    | Outbound network requests (SSRF)           |
  | `Server`, `Live`          | Spawning nested servers                    |
  | `RateLimit`, `Middleware` | HTTP infrastructure                        |
  | `Ffi`, `Context`, `Fmt`   | Low-level / Go FFI escape hatches          |

  Allowed: `String`, `List`, `Dict`, `Set`, `Maybe`, `Result`, `Math`, `Regex`,
  `Char`, `Crypto` (hashing only), `Encoding`, `Json`, `Uuid`, `Task`, `Time`,
  `Random`, `Log.println`.

## Architecture

```
src/
├── Main.sky          — Sky.Live app entry (init, subscriptions, main)
├── State.sky         — Model + Msg types (no Std.Ui imports)
├── Update.sky        — update function + Cmd.perform wiring
├── Security.sky      — pure security validation and sanitisation
├── Runner.sky        — Task helpers: format and run via Process
├── Examples.sky      — built-in example programs
└── View/
    ├── Common.sky    — shared colours, spacing constants, button helpers
    ├── Sidebar.sky   — examples list panel
    ├── Editor.sky    — code input + Format / Run buttons
    └── Output.sky    — output display panel
```
