import React, {useCallback, useEffect, useState} from 'react';
import {PagesType, PageType} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import {slugify} from "../../slugify";
import ReactQuill from "react-quill";
import {Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import PageSpinner from "../PageSpinner/PageSpinner";

const AdminForm = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PagesType []>([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editableContent, setEditableContent] = useState<PageType>({
    title: "",
    description: "",
  });

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const pagesResponse = await axiosApi.get<PagesType []>("/pages.json");
      setPages(pagesResponse.data);
    } catch (e) {
      throw new Error("Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPages();
  }, [fetchPages]);

  const onPageSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    if (categoryName !== "new") {
      try {
        setLoading(true);
        const contentResponse = await axiosApi.get<PageType>("/pages/" + categoryName + ".json");
        setEditableContent(contentResponse.data);
      } catch (e) {
        throw new Error("Error");
      } finally {
        setLoading(false);
      }
    } else {
      setEditableContent({
        title: "",
        description: "",
      });
    }
    setCategory(categoryName);
  };

  const onNewPageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPageName = e.target.value;
    setNewCategory(newPageName);
  };

  const onContentInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setEditableContent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onDescriptionChange = (html: string) => {
    setEditableContent(prevState => ({
      ...prevState,
      description: html,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (category !== "new") {
        await axiosApi.put("/pages/" + category + ".json", editableContent);
        navigate("/pages/" + category);
      } else {
        await axiosApi.put("/pages/" + newCategory + ".json", editableContent);
        navigate("/pages/" + newCategory);
      }
    } catch (e) {
      throw new Error("Error");
    }
  };


  return (
    <Container className="pt-4 text-center">
      {loading ? <PageSpinner/> : (
        <div>
          <h3 className="mb-3">{category !== "new" ? "Edit content" : "Create new page"}</h3>
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
                <option className="text-success fw-bold" value="new">Create new page</option>
              </Form.Select>
            </Form.Group>
            {category === "new" ? (
              <Form.Group className="mt-3">
                <Form.Label>Page name</Form.Label>
                <Form.Control
                  value={slugify(newCategory)}
                  type="text"
                  required
                  onChange={onNewPageNameChange}
                />
              </Form.Group>
            ) : null}
            <Form.Group className="mt-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                required
                value={editableContent.title}
                onChange={onContentInfoChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={editableContent.description}
                onChange={onDescriptionChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Button type="submit" className="btn-dark text-uppercase">Save</Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default AdminForm;