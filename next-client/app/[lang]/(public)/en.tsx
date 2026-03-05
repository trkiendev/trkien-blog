'use client';

import Link from "next/link";
import Image from "next/image";
import style from "./homepage.module.css";
import { useEffect, useState } from "react";
import { GetAllTopics } from "@/domains/topic/topic.api";
import { TopicDto } from "@/domains/topic/topic.model";

export default function HomepageEN() {
      const [topics, setTopics] = useState<TopicDto[]>([]);

      useEffect(() => {
            (async () => {
                  const data = await GetAllTopics();
                  setTopics(data);
            })();
      }, []);

      return (
            <>
                  <div className={style.homepageHeading}>
                        <h1>Welcome to <span >trkien.blog</span> : software development</h1>
                        <p>Sharing my ex-software knowledge</p>
                  </div>

                  <div className={style.homepageTopics}>
                        <h2>Topics</h2>
                        <div className={style.listTopics}>
                              {topics.length === 0 ? (
                                    <p>No topics yet</p>
                              ) : (
                                    topics.map((topic) => (
                                          <Link key={topic.id} href={`/topics/${topic.name}`} className={style.topicItem}>
                                                <div className={style.topicItemIcon}>
                                                      {topic.imageUrl ? (
                                                            <Image src={topic.imageUrl} alt={topic.name} width={23} height={23} />
                                                      ) : (
                                                            <Image src="/icons/default-topic.png" alt="default-icon" width={23} height={23} />
                                                      )}
                                                </div>
                                                <span className={style.topicItemText}>
                                                      {topic.name}
                                                </span>
                                          </Link>
                                    ))
                              )}
                        </div>
                  </div>
            </>
      )
}