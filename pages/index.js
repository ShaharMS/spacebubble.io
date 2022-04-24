import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import space from '../styles/SpaceBG.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      	<Script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js' type='text/javascript'></Script>
      	<Head>
      	  <title>Spacebubble.io</title>
      	  <meta name="description" content="Welcome to Shahar's website! you might also know me as ShaharMS." />
      	  <link rel="icon" href="/favicon.ico" />
      	</Head>

		<div className={[space.stars, space.twinkling, space.clouds]}></div>
      	<main className={styles.main}>
      	  	<h1 className={styles.title}>
      	    Welcome!
      	  	</h1>
      	  	<p className={styles.description}>
      	    	<b>Welcome to my website!</b><br></br>here you can find info about my projects,<br></br>documentation for my libraries<br></br>and even <b>learn how to code!</b>
      	  	</p>
      	  	<div className={styles.grid}>
      	    	<Link href="/libraries/">
      	    	  	<a className={styles.card}>
      	    	    	<h2>← Code Libraries</h2>
      	    	    	<p>Find in-depth information and documentation about code libraries i made :)</p>
      	    	  	</a>
      	    	</Link>
      	    	<Link href="/apps/">
      	    	  	<a className={styles.card}>
      	    	    	<h2 style={{textAlign: 'right'}}>Apps {'&'} Programs → </h2>
      	    	    	<p>Explore mobile {'&'} desktop apps i made. you should try them out!</p>
      	    	  	</a>
      	    	</Link>
      	    	<Link href="/blogs/">
      	    	  	<a className={styles.card}>
      	    	    	<h2>← Blogs {'&'} Articles</h2>
      	    	    	<p>Pretty much look at stuff i wrote (dont worry, its pretty interesting!)</p>
      	    	  	</a>
      	    	</Link>
      	    	<Link href="/code/">
      	      		<a className={styles.card}>
      	        		<h2 style={{textAlign: 'right'}}>Learn to code → </h2>
      	        		<p>Learn to code with my online, multi-language {'&'} graphical code teacher!</p>
      	      		</a>
      	    	</Link>
      	  	</div>
      	</main>

      	<footer className={styles.footer}>
      	    Powered by My will to program in javascript (its non-existent)
      	    <span className={styles.logo}></span>
      	</footer>
    </div>
  )
}
