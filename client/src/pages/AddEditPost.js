import React, { useState } from "react";
import { TextField, Button, Autocomplete, Chip } from "@mui/material";
import FileBase from "react-file-base64";
import "./addPost.css";

const AddEditPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
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
  };

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
                  label="tags"
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
              onDone={({ base64 }) =>
                setPostData({ ...postData, image: base64 })
              }
            />
          </div>
          <div className="form-element">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPost;
