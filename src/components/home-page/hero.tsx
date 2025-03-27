import Image from 'next/image'

import styles from '@/styles/hero.module.css'
import myPic from '@/assets/images/site/rodhis.png'

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <Image src={myPic} alt="An image of Rodhis" width={300} height={300} />
            </div>
            <h1>Hello There! I&apos;m Rodrigo!</h1>
            <p>I&apos;m a full stack developer, and here you&apos;ll see posts about the technologies I use while also being able to browse previews and videos of some of my personal projects.</p>
            <h1>My Stacks:</h1>
            <div className={styles.icons}>
            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg" alt="ts icon" width={40} height={40} />
            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react icon" width={40} height={40} />
            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" alt="next icon" width={40} height={40} />
            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss icon" width={40} height={40} />
            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="node icon" width={40} height={40} />
            <Image src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="express icon" width={40} height={40} />
            </div>
        </section>
    )
}
