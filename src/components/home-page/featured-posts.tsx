import styles from "@/styles/featured-posts.module.css"

export default function FeaturedPosts(){
    return (
        <section className={styles.latest}>
            <h2>Featured Posts</h2>
            <ul>
                <li>
                    <a>
                        <div>
                            <h3>Post Title</h3>
                            <time>July 14th, 2021</time>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    )
}