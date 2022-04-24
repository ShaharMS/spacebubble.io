import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import space from '../styles/SpaceBG.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shahar&apos;s Libraries</title>
        <meta name="description" content="This site contains the documentation for my libraries. give those a try; theyre pretty good" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={[space.stars, space.twinkling, space.clouds]}></div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Libraries
        </h1>
        <p className={styles.description}>
          <b>Welcome to my website!</b><br></br>here you can find info about my projects,<br></br>documentation for my libraries<br></br>and even <b>learn how to code!</b>
        </p>
        <div className={styles.vgrid}>
          <Link href="/libraries/texter/index.html">
            <a className={styles.card}>
            <h2>texter</h2>
            <p>Cross-framework, cross-platform Haxe Library that brings support for general text related things, such as text input, right-to-left text, HTML and Markdown</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
          Powered 0.0001% of Shaggy&apos;s power (hehe)
          <span className={styles.logo}></span>
      </footer>
    </div>
  )
}
