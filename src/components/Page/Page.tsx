import React, {useCallback, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {PageType} from "../../types";
import axiosApi from "../../axiosApi";
import ReactQuill from "react-quill";

const Page = () => {
  const {pageName} = useParams();
  const [content, setContent] = useState<PageType | null>(null);

  const fetchContent = useCallback(async () => {
    const contentResponse = await axiosApi.get<PageType>("/pages/" + pageName + ".json");
    setContent(contentResponse.data);
  }, [pageName]);

  useEffect(() => {
    void fetchContent();
  }, [fetchContent]);

  return (
    <Container className="pt-5">
      <h4 className="text-center w-75 m-auto mb-4">{content?.title}</h4>
      <ReactQuill
        value={content?.description}
        readOnly
        theme={"bubble"}
      />
    </Container>
  );
};

export default Page;