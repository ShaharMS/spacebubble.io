import Head from 'next/head'
import styles from 'styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shahar&apos;s Libraries</title>
        <meta name="description" content="This site contains the documentation for my libraries. give those a try; theyre pretty good" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Libraries
        </h1>
        <p className={styles.description}>
          <b>Welcome to my website!</b><br></br>here you can find info about my projects,<br></br>documentation for my libraries<br></br>and even <b>learn how to code!</b>
        </p>
        <div className={styles.vgrid}>
          <a href="https://spacebubble.io/libraries/texter" className={styles.card}>
            <h2>← texter</h2>
            <p>Cross-framework, cross-platform <a href='https://haxe.org'>Haxe</a> Library that brings support for general text related things, such as text input, right-to-left text, HTML and Markdown</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by My will to program in javascript (its non-existent)
          <span className={styles.logo}></span>
      </footer>
    </div>
  )
}
