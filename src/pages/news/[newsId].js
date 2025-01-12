import { Col, Row, Carousel } from "antd";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import DrawingImage from "@/assets/images/banner-images/drawing_image.jpg";
import EagleImage from "@/assets/images/banner-images/eagle_image.jpg";
import RootLayout from "@/components/Layouts/RootLayout";
const contentStyle = {
  height: "425px",
  color: "#000",
};
const fullNews = ({ news }) => {
  console.log(news);
  return (
    <Carousel effect="fade" autoplay style={{ margin: "20px 0px" }}>
      {/* slider-1 */}

      {/* slider-2 */}
      <div>
        <Row>
          <Col
            lg={{
              span: 8,
            }}
          >
            <h1 style={{ fontSize: "50px" }}>{news?.title}</h1>
            <div
              className="line"
              style={{
                height: "5px",
                margin: "20px 0",
                background: "#000",
                width: "95%",
              }}
            ></div>

            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                color: "gray",
                margin: "10px 0px",
              }}
            >
              <span>
                <CalendarOutlined />
                {news?.release_date}
              </span>
              <span>
                <CommentOutlined /> {news?.comment_count} COMMENTS
              </span>
              <span>
                <ProfileOutlined /> {news?.category}
              </span>
            </p>

            <p style={{ fontSize: "20px" }}>{news?.description}</p>
          </Col>

          <Col
            lg={{
              span: 16,
            }}
            style={contentStyle}
          >
            <Image
              src={news?.image_url}
              fill
              alt="eagle_image"
              objectFit="cover"
              style={{ grayScale: "-1" }}
            />
          </Col>
        </Row>
      </div>
    </Carousel>
  );
};

export default fullNews;

fullNews.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const newses = await res.json();
//   const paths = newses?.map((news) => ({
//     params: { newsId: news.id.toString() },
//   }));
//   return { paths, fallback: false };
// fallback : false => 404 page
// fallback : true => won't build all dynamic pages.. (if you have 1000 dynamic pages, it will build only 10 pages).. and if you go to the page that is not built, it will build that page and show it to you. (it will build the page on the server side). applicable for the pages that are not visited frequently and many pages are there.
// fallback : "blocking" => it will build all the pages on the server side. (it will build the page on the server side). applicable for the pages that are visited frequently and many pages are there.
// };

// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
//   const data = await res.json();

//   return {
//     props: { news: data },
//   };
// };
export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();

  return {
    props: { news: data },
  };
};
