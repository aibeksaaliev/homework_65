import React, {useCallback, useEffect, useState} from 'react';
import {PageType} from "../../types";
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import ReactQuill from "react-quill";
import {Container} from "react-bootstrap";
import PageSpinner from "../PageSpinner/PageSpinner";

const Page = () => {
  const {pageName} = useParams();
  const [content, setContent] = useState<PageType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const contentResponse = await axiosApi.get<PageType>("/pages/" + pageName + ".json");
      setContent(contentResponse.data);
    } catch (e) {
      throw new Error("Error");
    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchContent();
  }, [fetchContent]);

  return (
    <Container className="pt-5">
      {loading ? <PageSpinner/> : (
        <div>
          <h4 className="text-center w-75 m-auto mb-4">{content?.title}</h4>
          <ReactQuill
            value={content?.description}
            readOnly
            theme={"bubble"}
          />
        </div>
      )}
    </Container>
  );
};

export default Page;