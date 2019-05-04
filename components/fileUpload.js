import { useLayoutEffect } from 'react';
import _get from 'lodash/get';

function FileUpload(props) {
  const { name, form } = props;

  useLayoutEffect(() => {
    const imgTag = document.getElementById(`image-${name}`);
    const loadedImg = _get(form, `values.${name}`);
    if (loadedImg && loadedImg !== '') {
      imgTag.src = loadedImg;
    }
  }, []); // on mount

  const handleChange = e => {
    const file = e.currentTarget.files[0];
    if (!file) {
      return null;
    } // when the file is not chosen, just bail out
    const reader = new FileReader();
    const imgTag = document.getElementById(`image-${name}`);
    imgTag.title = file.name;
    reader.onload = (event) => {
      imgTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
    form.setFieldValue(name, file);
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        onChange={o => handleChange(o)}
      />
      <img src="" alt="" id={`image-${name}`} />
    </div>
  );
}

export default FileUpload;
