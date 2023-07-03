import React from "react";
import { useParams } from "react-router-dom";
import FAQ from "../../components/FAQ";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { questionService } from "../../services/questionService";
import ContentDetail from "./components/ContentDetail";
import Courses from "./components/Courses";
import FeaturedDetail from "./components/FeaturedDetail";
import HeroDetail from "./components/HeroDetail";
import "./style.css";

const CourseDetail = () => {
  const { slug } = useParams();
  const { data: courseDetail } = useQuery(
    () => courseService.getCourseBySlug(slug),
    [slug]
  );

  const { data: dataQuestion } = useQuery(() => questionService.getQuestion());
  const { data: dataCourses } = useQuery(() => courseService.getCourse());

  return (
    <main className="mainwrapper coursedetailpage">
      <HeroDetail {...courseDetail} />
      <ContentDetail {...courseDetail} />
      <FeaturedDetail />
      <FAQ {...dataQuestion} />
      <Courses slug={slug} {...dataCourses} />
    </main>
  );
};

export default CourseDetail;
