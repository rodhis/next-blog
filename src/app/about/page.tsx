import Image from 'next/image'

import myself from '@/assets/images/site/myself.png'
import clarinet from '@/assets/images/site/clarinet.jpeg'
import beer from '@/assets/images/site/beer.jpeg'

import styles from '@/styles/about.module.css'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <article className={styles.article}>
            <h1 className={styles.title}>About me</h1>
            <Image src={myself} alt="An image of myself at a city party" width={300} height={300} />
            <p>
                My name is Rodrigo, but I really like the nickname Rodhis, so you can call me that too! I&apos;m from Abaíra,
                state of Bahia, Brazil, a very small but beautiful city that&apos;s part of the Chapada Diamantina region, with
                rich flora and fauna. You can visit me sometime!
            </p>
            <p>
                As a child, I have always liked technology and computers, especially if there were video games involved (lol). But
                life pushed me towards another direction, so my first profession was as a pharmacist.
            </p>
            <p>
                As life went on, during the pandemic, I had the need to do something else, and it had to be something I liked and
                could do at home. So I remembered my childhood, consulted with relatives, and started to study programming. Years
                later, with lots of bootcamps, free courses and an ongoing graduation, here I am, after lots of projects on GitHub,
                focusing on full-stack using NextJs, TypeScript, and Node.
            </p>
            <Image src={clarinet} alt="An image of myself with a clarinet" width={300} height={300} />
            <p>
                When I&apos;m not coding, I like to spend my time playing clarinet, which is inherited from my family. I also like
                to play video games, watch movies and series, and dedicate a good amount of time listening to music.
            </p>
            <p>I&apos;m also a beer lover, so come drink a cold one with me! hehe</p>
            <Image src={beer} alt="An image of me with a beer can" width={300} height={450} />
            <p>
                This website was part of a migration project from Next 10 pages router, in which I incremented with other stuff
                and decided to make it my personal blog, and, in the future, a portfolio of my projects. I hope you enjoy it! And
                please contact me for anything you want to talk about!
            </p>
            <h2>Other technologies I know</h2>
            <ul>
                <li>Agile Methodologies (Scrum, Kanban);</li>
                <li>Front-End technologies: Bootstrap, TailWindCSS, SASS, CMS (Content Management System);</li>
                <li>Back-end: Express, MySQL, PostgreSQL, MongoDB;</li>
                <li>Cloud: AWS (with certifications AWS Certified Cloud Practitioner and AWS Certified AI Practitioner)</li>
                <li>Tests: Jest, Vitest, React Testing Library</li>
            </ul>
            <h2>
                Links to my GitHub, LinkedIn and certifications: <br />
                <Link href="https://linktr.ee/rodhiss">Linktr.ee</Link>
            </h2>
        </article>
    )
}
