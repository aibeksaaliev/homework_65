import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import axiosApi from "../../axiosApi";
import {PagesType, PageType} from "../../types";
import {useNavigate} from "react-router-dom";

const AdminForm = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PagesType []>([]);
  const [category, setCategory] = useState("");
  const [editableContent, setEditableContent] = useState<PageType>({
    title: "",
    description: "",
  });

  const fetchPages = useCallback(async () => {
    const pagesResponse = await axiosApi.get<PagesType []>("/pages.json");
    setPages(pagesResponse.data);
  }, []);

  useEffect(() => {
    void fetchPages();
  }, [fetchPages]);


  const onPageSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    const contentResponse = await axiosApi.get<PageType>("/pages/" + categoryName + ".json");
    setEditableContent(contentResponse.data);
    setCategory(categoryName);
  };

  const onContentInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setEditableContent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosApi.put("/pages/" + category + ".json", editableContent);
    navigate("/pages/" + category);
  };


  return (
    <Container>
      <h3>Edit Content</h3>
      <Form onSubmit={onFormSubmit}>
        <Form.Group>
          <Form.Select onChange={onPageSelectChange} name="id" value={category}>
            <option hidden>Choose a category</option>
            {Object.keys(pages).map(category => {
              return <option
                key={category}
                value={category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            required
            value={editableContent.title}
            onChange={onContentInfoChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            required
            rows={7}
            value={editableContent.description}
            onChange={onContentInfoChange}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Save</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AdminForm;