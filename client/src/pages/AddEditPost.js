import React, { useState, useEffect } from "react";
import { TextField, Button, Autocomplete, Chip } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/features/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./addPost.css";

const AddEditPost = () => {
  const { loading, error } = useSelector((state) => ({ ...state.post }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    img: "",
    tags: [],
  });

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
    const updatedPostData = { ...postData, name: user?.result?.name };
    dispatch(createPost({ updatedPostData, navigate, toast }));
    clearForm();
  };

  const clearForm = () => {
    setPostData({
      title: "",
      description: "",
      tags: [],
      img: "",
    });
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="form-parent">
      <h1>Add/EditPost</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              required
              fullWidth
              value={postData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-element">
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={3}
              value={postData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-element">
            <Autocomplete
              multiple
              id="tags-filled"
              options={[]}
              defaultValue={[]}
              freeSolo
              onChange={(e, value) =>
                setPostData((state) => ({ ...state, tags: value }))
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  value={postData.tags}
                  placeholder="Press enter after typing"
                />
              )}
            />
          </div>
          <div className="form-element">
            <label>Select Image</label>
            <br />
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, img: base64 })}
              value={postData.img}
            />
          </div>
          <div className="form-element">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Post
            </Button>
          </div>
          <div className="form-element">
            <Button
              variant="contained"
              color="error"
              onClick={clearForm}
              fullWidth
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPost;
