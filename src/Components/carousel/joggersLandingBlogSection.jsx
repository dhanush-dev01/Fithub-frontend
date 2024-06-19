import React, { useCallback, useEffect, useState } from "react";
import { client } from "../../client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./joggersLandingBlogSection.css";

export default function JoggersLandingBlogSection() {
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);

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
      // console.log("Cleaned Image URL:", postBg);
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

  return (
    <div className="joggersLandingBlogSection-container">
      {blogPosts.map((item) => {
        // console.log("Rendered Image URL:", item.postBg);
        return (
          <div
            key={item.id}
            id={`content-${item.id}`}
            className={`joggersLandingBlogSection-postWrap ${item.postType}`}
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
        );
      })}
    </div>
  );
}
