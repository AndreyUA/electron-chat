import React from "react";
import { useForm } from "react-hook-form";

// Components
import { withBase } from "../layouts/Base.jsx";

const ChatCreate = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="centered-container-form"
        >
          <div className="header">Create chat now!</div>
          <div className="subheader">Chat with your friends!</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="name"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                name="description"
                className="form-control"
                id="description"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                {...register("image")}
                type="text"
                className="form-control"
                id="image"
                name="image"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(ChatCreate, { canGoBack: true });
