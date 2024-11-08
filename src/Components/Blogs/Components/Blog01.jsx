import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiUrl } from "../../ApiUrl";
import getData from "../../Methods";
import "./Style/Blog01.css";

const Blog01 = () => {
  const { page_slug } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getData(`${ApiUrl.GETBLOGBYSLUG}/${page_slug}`);
        if (response.status === 200) {
          setBlogData(response.data);
          console.log(response, "response")
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlogData();
  }, [page_slug]);
  return (
    <article className="Blog01">
      <h1>{blogData?.title}</h1>

      <section className="Blog01Wrapper01">
        <div className="Blog01Wrapper01HeadingAndImage">
          <img
            src={`${ApiUrl.IMAGEURL}/BlogImage/${blogData?.blogImg}`}
            alt="image"
          />
        </div>
        <div className="Blog01Wrapper01Paras">

          <p
            dangerouslySetInnerHTML={{ __html: blogData?.subtitle }}
          />

          {/* <article>
            <h2>What is Meditation?</h2>
            <p>
              Meditation is the part of Yoga and practiced from the Thousands of
              the Year. It is a normal process where you have to breathe in and
              breathe out for some equal minutes. Nowadays Meditation is very
              common to relieve Stress. Meditation is complementary to Medicine,
              it can produce deep Relaxation in your Mind and Calms your Body.
              Meditation may result in enhanced Physical and Emotional
              Well-being.
            </p>
          </article > */}
        </div>
      </section>

      <section className="Blog01Wrapper02">
        <div className="Blog01Wrapper02SubHeadingAndParaImage">
          <div>

           
            <div className="Blog01Wrapper02SubHeadingAndParaImageBenefits">
            <p
            dangerouslySetInnerHTML={{ __html: blogData?.description }}
          />
            </div>
          </div>
         
        </div>
      </section>
      {/* <p className="lastpara">
        Therefore meditation helps you in calming your mind from inner and
        outer, it makes you peaceful. So add meditation in your daily routine
        for more benefits.
      </p> */}
    </article>
  );
};

export default Blog01;
