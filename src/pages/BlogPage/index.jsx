import React, { useRef, useState } from "react";
import { blogService } from "../../services/blogService";
import useQuery from "../../hooks/useQuery";
import BlogItem from "./components/BlogItem";
import { Skeleton } from "antd";

const BlogPage = () => {
  // ?category=646cdb65bba65757b85ab8bd
  const [selectedId, setSelectedId] = useState("");

  const { data: dataCategories } = useQuery(() =>
    blogService.getBlogCategories()
  );

  const { data, loading } = useQuery(
    () => blogService.getBlogList(selectedId),
    [selectedId]
  );

  const categories = dataCategories?.blogs;
  const blogList = data?.blogs;

  const handleCategoryClick = (id) => {
    setSelectedId(id);
  };

  return (
    <main className="mainwrapper blog --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Blog</h2>
          </div>
        </div>
        <div className="blog__menu">
          {categories?.length > 0 &&
            [{ name: "Tất cả", id: "" }, ...categories].map((item, index) => {
              return (
                <a
                  href="#"
                  key={item.id || index}
                  className={`blog__menu-item ${
                    selectedId === item.id ? "active" : ""
                  }`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    handleCategoryClick(item.id);
                  }}
                >
                  {item.name}
                </a>
              );
            })}
        </div>
        <div className="blog__list">
          {!loading && !(blogList?.length > 0) && (
            <p className="text">Không có bài viết nào</p>
          )}
          {loading &&
            Array(6)
              .fill("")
              .map((_, index) => (
                <div key={index} className="blog__list-item">
                  <Skeleton
                    active
                    style={{ width: "415px", height: "448px" }}
                  />
                </div>
              ))}
          {blogList?.length > 0 &&
            !loading &&
            blogList.map((item, index) => <BlogItem key={index} {...item} />)}
        </div>
        <ul className="paging">
          <li>
            <a href="#">
              <i>
                <img src="/img/iconprev.svg" alt="" />
              </i>
            </a>
          </li>
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">
              <i>
                <img src="/img/iconprev.svg" alt="" />
              </i>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default BlogPage;
