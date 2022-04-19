import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spacebubble.io</title>
        <meta name="description" content="Welcome to Shahar's website! you might also know me as ShaharMS." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://spacebubble.io">Spacebubble.io!</a>
        </h1>
        <p className={styles.description}>
          Wanna learn how to code

        </p>
        <div className={styles.grid}>
          <a href="https://spacebubble.io/libraries" className={styles.card}>
            <h2>← Libraries</h2>
            <p>Find in-depth information and documentation about code libraries i made :)</p>
          </a>

          <a href="https://spacebubble.io/apps" className={styles.card}>
            <h2>Apps → </h2>
            <p>Explore mobile {'&'} desktop apps i made. you should try them out!</p>
          </a>

          <a
            href="https://spacebubble.io/blog"
            className={styles.card}
          >
            <h2>← Blogs {'&'} Articles</h2>
            <p>Pretty much look at stuff i wrote (dont worry, its pretty interesting!)</p>
          </a>

          <a
            href="https://spacebubble.io/code"
            className={styles.card}
          >
            <h2>Learn to code → </h2>
            <p>Learn to code with my online, multi-language {'&'} graphical code teacher!</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
          </span>
        </a>
      </footer>
    </div>
  )
}
