function FileUpload(props) {
  const { name, form } = props;

  const handleChange = e => {
    const file = e.currentTarget.files[0];
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
