import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function Home() {
  return ( 
    <div className={styles.container}>
        <Head>
      	  <title>Learn Coding!</title>
      	  <meta name="description" content="Want to learn the basics of coding in an undertandable and interactive way while not having to learn a second language! you can write in spanish, english, hebrew and more!" />
      	  <link rel="icon" href="/favicon.ico" />
      	</Head>
        <div className={styles.spaceContainer}></div>
        <main className={styles.main}>
            <h1 className={styles.title}>
                Learn Coding!
            </h1>
            <p className={styles.description}>
                This project is a work in progress, but what is it?  
            </p>
            <p className={styles.description}>
                Basically, you write <b>real</b> code in your preferred native language, and after writing you will be able to run it and complete the levels!
                

                And yes, i said levels! its going to be designed as a game, with levels and everything, in which you will create and contorl the characters with code.
                to complete these levels, you&apos;ll need to write some code to control the characters and move them the the desired location.

                If youre interested in contributing to this project, you&apos;ll need to know two things:
                <ol>
                    <li><b>How to program in Haxe.</b> <Link href="https:\\www.haxe.org">you can install the language and learn it here.</Link></li>
                    <li><b>The language you want to implement.</b> Notice - you want the resulting code to be very understandable!</li>
                </ol>

                The project can be found on github under my user: ShaharMS. <coloredLink><Link href="https://github.com/ShaharMS/Multilang-Coder">can also be found here</Link></coloredLink>
            </p>
            <h3 className={styles.title3}> Example (in hebrew): </h3>
            <div className={styles.row}>
                <p className={styles.card}>
                    משתנה ילד = צור ילד()‏<br></br>
                    ילד.שם = חיים<br></br>
                    ילד.זוז_לנקודה(110,20)<br></br>
                    ילד.אסוף_כוכב()‏<br></br>
                </p>
                <h1><br></br>--><br></br></h1>
                <p className={styles.card}>
                    var name1 = new Child();<br></br>
                    name1.name = &quot;חיים&quot;;<br></br>
                    name1.moveTo(110,20);<br></br>
                    name1.pickUpStar();<br></br>
                </p>
            </div>
        </main>
    </div>
  )
}
