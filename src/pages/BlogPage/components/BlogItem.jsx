import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../../constants/pathnames";
import { formatDateDisplay } from "../../../utils/format";

const BlogItem = ({
  slug,
  image,
  category,
  name,
  author,
  createdAt,
  sortOrder,
}) => {
  const images = [
    "https://cfdcircle.vn/files/thumbnails/JuQE6Rd3DGuiHJOpgEb3Jg1KoLoa25OlLrl1pDQa.jpg",
    "https://cfdcircle.vn/files/thumbnails/ebQvh5lMnPglamK4Q8DDWdoyzTnHLcDej5KJnlJh.jpg",
    "https://cfdcircle.vn/files/thumbnails/ZXjS4gWbyeJ95CrLVUTwZI90CQQwBIrDI9Ik64sq.jpg",
    "https://cfdcircle.vn/files/thumbnails/ZettvAFqback8Jzxiyz3DVPjvkoBUhUJY94DJwSK.jpg",
    "https://cfdcircle.vn/files/thumbnails/Tey1o9gldaFwCrCvQ0vgSDKuE6CKFYnBm4dWIVps.jpg",
    "https://cfdcircle.vn/files/thumbnails/esliqep9bvqPUmju6zn1Cf6cFBBwNXhcZlwHcwtL.jpg",
  ];

  return (
    <div className="blog__list-item">
      <div className="img">
        <Link to={PATH.BLOG + `/${slug}`}>
          <img
            src={`${image || images[sortOrder - 1]}`}
            alt="Khóa học CFD"
            className="course__thumbnail"
          />
        </Link>
      </div>
      <div className="content">
        <p className="label">{category?.name}</p>
        <h2 className="title --t3">
          <Link to={PATH.BLOG + `/${slug}`}>{name}</Link>
        </h2>
        <div className="content__info">
          <div className="user">
            <div className="user__img">
              <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
            </div>
            <p className="user__name">{author}</p>
          </div>
          <div className="date">{formatDateDisplay(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
