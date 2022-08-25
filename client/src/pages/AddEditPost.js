import React, { useState, useEffect } from "react";
import { TextField, Button, Autocomplete, Chip } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getSinglePost,
  editPost,
} from "../redux/features/postSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./addPost.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0069D9",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0069D9",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
    },
  },
  chip: {
    backgroundColor: "#767676 !important",
    marginLeft: "5px !important",
  },
});

const AddEditPost = () => {
  const classes = useStyles();
  const { loading, error, singlePost } = useSelector((state) => ({
    ...state.post,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    img: "",
    tags: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  useEffect(() => {
    if (singlePost) {
      setPostData({
        title: singlePost.title,
        description: singlePost.description,
        img: singlePost.img,
        tags: singlePost.tags,
      });
    }
  }, [singlePost]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPostData = { ...postData, name: user?.result?.name };
    if (id) {
      dispatch(editPost({ id, updatedPostData, navigate, toast }));
    } else {
      dispatch(createPost({ updatedPostData, navigate, toast }));
    }
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
      <div className="form-container">
        <h1 style={{ textAlign: "center", color: "#fff" }}>
          {id ? "Edit Post" : "Add Post"}
        </h1>
        <form onSubmit={handleSubmit}>
          {loading ? (
            <p style={{ textAlign: "center", color: "#fff" }}>Please wait...</p>
          ) : (
            <>
              <div className="form-element">
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={postData.title}
                  onChange={handleChange}
                  className={classes.root}
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
                  className={classes.root}
                />
              </div>
              <div className="form-element">
                {singlePost ? (
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={[]}
                    defaultValue={singlePost.tags}
                    freeSolo
                    onChange={(e, value) =>
                      setPostData((state) => ({ ...state, tags: value }))
                    }
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          className={classes.chip}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        value={postData.tags}
                        className={classes.root}
                        placeholder="Press enter after typing"
                      />
                    )}
                  />
                ) : (
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
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          className={classes.chip}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        className={classes.root}
                        placeholder="Press enter after typing"
                      />
                    )}
                  />
                )}
              </div>
              <div className="form-element">
                <label style={{ color: "#fff" }}>Select Image</label>
                <br />
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, img: base64 })
                  }
                  value={postData.img}
                  size={60}
                />
              </div>
            </>
          )}
          <div className="form-element">
            {loading ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled
              >
                {singlePost ? "Saving Changes" : "Adding Post"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {singlePost ? "Save Changes" : "Add Post"}
              </Button>
            )}
          </div>
          <div className="form-element">
            {loading ? (
              <Button
                variant="contained"
                color="error"
                onClick={clearForm}
                fullWidth
                disabled
              >
                Clear
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={clearForm}
                fullWidth
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPost;
