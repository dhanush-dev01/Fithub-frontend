import React, { useCallback, useEffect, useState, useRef } from "react";
import { client } from "../../client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./joggersLandingBlogSection.css";

export default function JoggersLandingBlogSection() {
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const postsRef = useRef([]);

  const cleanUpBlogPosts = (rawdata) => {
    const cleanPosts = rawdata.map((post) => {
      const { sys, fields } = post;
      const { id } = sys;
      const postTitle = fields.title;
      const postDescription = fields.description;
      let postBg = fields.image[0].url; 
      if (!postBg.startsWith("http")) {
        postBg = `https:${postBg}`;
      }
      const postType = fields.type;
      const updatedPost = {
        id,
        postTitle,
        postDescription,
        postBg,
        postType,
      };
      return updatedPost;
    });

    setBlogPosts(cleanPosts);
  };

  const getBlogPosts = useCallback(async () => {
    setIsBlogLoading(true);
    try {
      const response = await client.getEntries({
        content_type: "joggingLandingBlogSection",
      });
      const responsedata = response.items;
      if (responsedata) {
        cleanUpBlogPosts(responsedata);
      } else {
        setBlogPosts([]);
      }
      setIsBlogLoading(false);
    } catch (error) {
      console.log(error);
      setIsBlogLoading(false);
    }
  }, []);

  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    postsRef.current.forEach((post) => {
      if (post) observer.observe(post);
    });

    return () => {
      postsRef.current.forEach((post) => {
        if (post) observer.unobserve(post);
      });
    };
  }, [blogPosts]);

  return (
    <div className="joggersLandingBlogSection-container">
      {blogPosts.map((item, index) => {
        const isLeftAligned = index % 2 === 0;
        const postWrapClass = `joggersLandingBlogSection-postWrap ${isLeftAligned ? 'left' : 'right'} ${index === 0 ? 'first-item' : ''}`;

        return (
          <React.Fragment key={item.id}>
            <div
              id={`content-${item.id}`}
              className={postWrapClass}
              ref={(el) => (postsRef.current[index] = el)}
            >
              <div 
                className="joggersLandingBlogSection-image"
                style={{ backgroundImage: `url(${item.postBg})` }}
              ></div>
              <div className="joggersLandingBlogSection-contentWrap">
                <div className="joggersLandingBlogSection-text">
                  <h2 className="joggersLandingBlogSection-title">{item.postTitle}</h2>
                  <div className="joggersLandingBlogSection-description">
                    {documentToReactComponents(item.postDescription)}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
