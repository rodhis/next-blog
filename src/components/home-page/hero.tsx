import Image from "next/image"

import styles from "@/styles/hero.module.css"
import myPic from "@/assets/images/site/rodhis.png"

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <Image src={myPic} alt="An image of Rodhis" width={300} height={300} />
            </div>
            <h1>Hello! I'm Rodrigo, but you can call me Rodhis!</h1>
            <p>
                I'm a full stack developer, and I'm making this blog to tell you bits about my work.
            </p>
        </section>
    )
}
