import { Formik, Field } from 'formik';
import FileUpload from './fileUpload';

const defaultPost = {
  title: '',
  context: '',
  image: null,
};

const CreatePost = () => {
  const submitPost = ({ title, context, image }) => {
    // TODO
  };
  return (
    <Formik onSubmit={submitPost} initialValues={{ post: defaultPost }}>
      {({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className="page--admin-post--form">
          <h1>create post</h1>
          <label>
            title
            <Field name="title" />
          </label>
          <label>
            context
            <Field name="context" component="textarea" />
          </label>
          <label>
            image
            <FileUpload name="image" form={form} />
          </label>
          <button type="submit">submit</button>
        </form>
      )}
    </Formik>
  );
};

export default CreatePost;
