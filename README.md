# Verus Playground

This is the home of the [Verus Playground][verus],
inspired by the [Rust Playground][real].

[real]: https://play.rust-lang.org/
[verus]: https://play.verus-lang.org/

## What's it do?

The playground allows you to experiment with [Verus][verus] before you install
it locally, or in any other case where you might not have the compiler
available.

It has a number of features, including:

1. A nice, unobtrusive editor with syntax highlighting.
1. The ability to run with basic or detailed error messages.
1. The ability to quickly load and save your code to a
   GitHub [Gist][gist] and share it with your friends.

[verus]: https://github.com/verus-lang/verus
[Rust Cookbook]: https://rust-lang-nursery.github.io/rust-cookbook/
[gist]: https://gist.github.com/
[rustfmt]: https://github.com/rust-lang/rustfmt
[clippy]: https://github.com/rust-lang/rust-clippy

## Architecture

A [React][react] frontend communicates with an [Axum][axum]
backend. [Docker][docker] containers are used to provide the various
compilers and tools as well as to help isolate them.

We hope that this frontend and backend stack is comfortable to
potential contributors! If you are interested in contributing, please
feel free to ask a question and we might even be able to point out
some useful resources.

[react]: https://reactjs.org/
[axum]: https://github.com/tokio-rs/axum
[docker]: https://www.docker.com/

## Resource Limits

### Network

There is no network connection between the compiler container and the
outside world.

### Memory

The amount of memory the compiler and resulting executable use is
limited by the container.

### Execution Time

The total compilation and execution time is limited by the container.

### Disk

This sandbox **does not** provide any disk space limits. It is
suggested to run the server such that the temp directory is a
space-limited. One bad actor may fill up this shared space, but it
should be cleaned when that request ends.

## Security Hall of Fame

A large set of thanks go to those individuals who have helped by
reporting security holes or other attack vectors against the
Playground. Each report helps us make the Playground better!

If you'd like to perform tests that you think might disrupt service of
the Playground, get in touch and we can create an isolated clone to
perform tests on! Once fixed, you can choose to be credited here.

## Deployment

To deploy the playground, follow the instructions in the [deployment folder](./deployment/).

## Development

To experiment locally, you need to follow the instructions below.  See the
[deployment configuration script](./deployment/lxc-config.yaml) for more
details.

### Build the UI
```
cd ui/frontend
yarn
yarn run watch # Will rebuild and watch for changes
```

If you don't need the backend running because you are only making
basic HTML/CSS/JS changes, directly open in your browser the built
`ui/frontend/build/index.html`.

### Build and run the server

```
cd ui
cargo run
```

There are some optional configuration parameters described in the
[ui README](./ui/README.md) which you may set in a `.env` file. The server will
run with no configuration, but in order to load and save gists a GitHub token
must be configured.

### Build the container
```
cd compiler
docker build -t verus .
```


## License

Licensed under either of
 * Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)
at your option.
