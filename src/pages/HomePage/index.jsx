import React from "react";
import ComingCourse from "./components/ComingCourse";
import CourseList from "./components/CourseList";
import FAQ from "../../components/FAQ";
import Feature from "./components/Feature";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Teacher from "./components/Teacher";
import Testimonial from "./components/Testimonial";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { teamsService } from "../../services/teamsService";
import { pageService } from "../../services/pageService";
import { rateService } from "../../services/rateService";
import { questionService } from "../../services/questionService";
import { galleryService } from "../../services/galleryService";
import CallRegister from "../../components/CallRegister";
import useDebounce from "../../hooks/useDebounce";
import PageLoading from "../../components/PageLoading";

const HomePage = () => {
  const { data: dataCourses, loading: loadingCourses } = useQuery(() =>
    courseService.getCourse()
  );
  const { data: dataTeams, loading: loadingTeams } = useQuery(() =>
    teamsService.getTeams()
  );
  const { data: dataHomePage, loading: loadingHomePage } = useQuery(() =>
    pageService.getHomePage()
  );
  const { data: dataRate, loading: loadingRate } = useQuery(() =>
    rateService.getRates()
  );
  const { data: dataQuestion, loading: loadingQuestion } = useQuery(() =>
    questionService.getQuestion()
  );
  const { data: dataGallery, loading: loadingGallery } = useQuery(() =>
    galleryService.getGallery()
  );

  const allLoading =
    loadingCourses ||
    loadingTeams ||
    loadingHomePage ||
    loadingRate ||
    loadingQuestion ||
    loadingGallery;

  const isLoadingPage = useDebounce(allLoading, 1000);
  if (isLoadingPage) {
    return <PageLoading />;
  }

  return (
    <main className="mainwrapper">
      <Hero />
      <ComingCourse {...dataCourses} />
      <CourseList {...dataCourses} />
      <Teacher {...dataTeams} />
      <Feature {...dataHomePage} />
      <Testimonial {...dataRate} />
      <FAQ {...dataQuestion} />
      <Gallery {...dataGallery} />
      <CallRegister />
    </main>
  );
};

export default HomePage;
//npm i styled-components@5.3.1
//yarn add flickity
//yarn add react-flickity-component
