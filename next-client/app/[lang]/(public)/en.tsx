import Link from "next/link";
import Image from "next/image";
import style from "./homepage.module.css";

export default function HomepageEN() {
      return (
            <>
                  <div className={style.homepageHeading}>
                        <h1>Welcome to <span >trkien.dev</span> blog : software development</h1>
                        <p>Sharing my ex-software knowledge</p>
                  </div>

                  <div className={style.homepageTopics}> 
                        <h2>Topics</h2>
                        <div className={style.listTopics}>
                              <Link href="/" className={style.topicItem}>
                                    <div className={style.topicItemIcon}>
                                          <Image src="/icons/netcore.png" alt="topic-icon" width={23} height={23}/>
                                    </div>
                                    <span className={style.topicItemText}>.NET</span>
                              </Link>
                        </div>
                  </div>
            </>
      )
}