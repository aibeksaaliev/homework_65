import React, {useCallback, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {PageType} from "../../types";
import axiosApi from "../../axiosApi";

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
    <Container>
      <span className="d-block text-center text-uppercase fw-bold mb-3">{pageName}</span>
      <h4>{content?.title}</h4>
      <p>{content?.description}</p>
    </Container>
  );
};

export default Page;