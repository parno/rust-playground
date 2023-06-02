import React from 'react';

import * as actions from './actions';
import Example from './HelpExample';
import Link from './uss-router/Link';

import styles from './Help.module.css';

import integer32Logo from './assets/integer32-logo.svg';

const ACE_URL = 'https://github.com/ajaxorg/ace';
const CLIPPY_URL = 'https://github.com/Manishearth/rust-clippy';
const MIRI_URL = 'https://github.com/rust-lang/miri';
const CRATES_IO_URL = 'https://crates.io/';
const RUST_COOKBOOK_URL = 'https://rust-lang-nursery.github.io/rust-cookbook/';
const CRATES_URL = 'https://github.com/rust-lang/rust-playground/blob/main/compiler/base/Cargo.toml';
const GIST_URL = 'https://gist.github.com/';
const I32_URL = 'http://integer32.com/';
const LOCALSTORAGE_URL = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API';
const ORIGINAL_PLAYGROUND_URL = 'https://github.com/rust-lang/rust-playground';
const REPO_URL = 'https://github.com/parno/rust-playground';
const RUSTFMT_URL = 'https://github.com/rust-lang-nursery/rustfmt';
const SHEPMASTER_URL = 'https://github.com/shepmaster/';
const VERUS_URL = 'https://github.com/verus-lang/verus';

const CRATE_EXAMPLE = `extern crate rand;
use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    println!("{}", rng.gen::<u8>());
}`;

const CLIPPY_EXAMPLE = `fn main() {
    match true {
        true => println!("true"),
        false => println!("false"),
    }
}`;

const MIRI_EXAMPLE = `fn main() {
    let mut a: [u8; 0] = [];
    unsafe {
        *a.get_unchecked_mut(1) = 1;
    }
}`;

const RUSTFMT_EXAMPLE = `// wow, this is ugly!
fn main ()
{ struct Foo { a: u8, b: String, }
match 4 {2=>{},_=>{}} }`;

const LINK_EXAMPLE = 'https://play.verus-lang.org/?code=fn main() { assert(42 > 0); }';

const TEST_EXAMPLE = `#[test]
fn test_something() {
    assert_ne!(42, 0);
}`;

const LIBRARY_EXAMPLE = `#![crate_type="lib"]

pub fn library_fn() -> u8 {
    42
}`;

const OUTPUT_EXAMPLE = `#[inline(never)]
pub fn a_loop() -> i32 {
    let mut sum = 0;
    for i in 0..100 {
        sum += i;
    }
    sum
}

fn main() {
    println!("{}", a_loop());
}`;

const Help: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1>The Verus Playground</h1>
      <Link action={actions.navigateToIndex}>Return to the playground</Link>

      <LinkableSection id="about" header="About" level="h2">
        <p>
          The playground is an <a href={REPO_URL}>open source project</a>.
          If you have any suggestions for features, issues with the
          implementation, or just want to read the code for yourself,
          you are invited to participate!
        </p>

        <p>
          This playground is modeled after the <a href={ORIGINAL_PLAYGROUND_URL}>original
        Rust playground</a>, and we owe a great debt to every contributor to
                                      that project.
        </p>

        <p>
          This playground was created by the <a href={VERUS_URL}>Verus Team</a>.
        </p>

      </LinkableSection>

      <LinkableSection id="features" header="Features" level="h2">
        <LinkableSection id="features-sharing" header="Sharing code" level="h3">
          <p>
            Once you have some code worth saving or sharing, click on the
            {' '}
            <strong>Share</strong> button. This will create a
            {' '}
            <a href={GIST_URL}>GitHub Gist</a>. You will also be provided with
            a URL to load that Gist back into the playground.
          </p>
        </LinkableSection>

        <LinkableSection id="features-linking" header="Linking to the playground with initial code" level="h3">
          <p>
            If you have a web page with Verus code that you’d like to
            show in action, you can link to the playground with the
          Verus code in the query parameter <Code>code</Code>. Make sure to
                                        escape any special characters. Keep the code short, as URLs have
                                        limitations on the maximum length.
          </p>

          <pre className={styles.code}><code>{LINK_EXAMPLE}</code></pre>
        </LinkableSection>

        <LinkableSection id="features-modes" header="Verification modes" level="h3">
          <p>
            By default, Verus aims to run verification queries as fast as possible.
            When you encounter a verification error, you can request more details
            via the <strong>--expand-errors</strong> flag.  This may take longer to run, however.
          </p>

          <p>
            You can choose which mode to verify with using the <strong>Error Mode</strong>
            {' '}
            menu.
          </p>
        </LinkableSection>

        <LinkableSection id="features-customization" header="Customization" level="h3">
          <p>
            The <a href={ACE_URL}>Ajax.org Cloud9 Editor (Ace)</a> is used to
            provide a better interface for editing code. Ace comes with
            several keybinding options (such as Emacs and Vim) as well as many
            themes.
          </p>

          <p>
            You may also disable Ace completely, falling back to a
            simple HTML text area.
          </p>

          <p>
            These options can be configured via the <strong>Config</strong> menu.
          </p>
        </LinkableSection>

        <LinkableSection id="features-persistence" header="Persistence" level="h3">
          <p>
            The most recently entered code will be automatically saved in your browser’s
            {' '}
            <a href={LOCALSTORAGE_URL}>local storage</a>. This allows you to recover
            your last work even if you close the browser.
          </p>

          <p>
            Local storage is a singleton resource, so if you use multiple windows,
            only the most recently saved code will be persisted.
          </p>
        </LinkableSection>
      </LinkableSection>

      <LinkableSection id="limitations" header="Limitations" level="h2">
        <p>
          To prevent the playground from being used to attack other computers and
          to ensure it is available for everyone to use, some limitations
          are enforced.
        </p>

        <dl>
          <dt>Network</dt>
          <dd>
            There is no network connection available during compilation or
            execution of user-submitted code.
          </dd>

          <dt>Memory</dt>
          <dd>
            The amount of memory the compiler and resulting executable use is
            limited.
          </dd>

          <dt>Execution Time</dt>
          <dd>
            The total compilation and execution time is limited.
          </dd>

          <dt>Disk</dt>
          <dd>
            The total disk space available to the compiler and resulting
            executable is limited.
          </dd>
        </dl>
      </LinkableSection>
    </section>
  );
};

const LinkableSection: React.FC<LinkableSectionProps> = ({
  id, header, level: Level, children,
}) => (
  <div id={id}>
    <Level>
      <span className={styles.header}>
        <a className={styles.headerLink} href={`#${id}`}>{header}</a>
      </span>
    </Level>
    {children}
  </div>
);

interface LinkableSectionProps {
  children: React.ReactNode;
  id: string;
  header: string;
  level: React.ElementType;
}

const Code: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <code className={styles.code}>{children}</code>
);

export default Help;
