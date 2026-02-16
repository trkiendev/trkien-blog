import style from "./homepage.module.css";

export default function HomepageVI() {
      return (
            <>
                  <div className={style.homepageHeading}>
                        <h1>Welcome to <span >trkien.dev</span> blog :</h1>
                        <p>Chia sẻ kiến thức lập trình phần mềm</p>
                  </div>

                  <div className={style.listTopics}> 
                        <h2>Chủ đề</h2>
                        <div></div>
                  </div>
            </>
      )
}