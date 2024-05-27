import { React, useState } from "react";
import Divider from "@mui/material/Divider";
import ListContent from "../components/ListContent";
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { uploadData } from "../scripts/api";
import green from "@assets/bg2.png";
import MessageModal from "../components/ModalView";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    type: "Document",
    content: "",
    hid: "473928710585",
    title: "",
    subheading: "Result",
  });

  const [checked, setChecked] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [isVisible, setisVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const fileData = event.target.files[0];
    const file = new File([fileData], "image.jpg");
    setImageFile(file);
  };

  const handleImageRemove = () => {
    setImageFile(null);
  };

  const handleSubmit = async () => {
    console.log(formData);
    const data = new FormData();
    const obj1 = [
      {
        title: checked ? formData.subheading : "",
        content: checked ? formData.content : "",
      },
    ];
    const obj = {
      author: "Mr. Doctor",
      recordtype: formData.type,
      title: formData.title,
      text: obj1,
      HID: formData.hid,
    };
    if (imageFile) data.append("image", imageFile, "image.jpg");
    data.append("data", JSON.stringify(obj));
    const res = await uploadData(data);
    console.log(res);
    if (res) {
      setModalTitle("Success!");
      setModalMessage("Data uploaded successfully!");
      setisVisible(true);
    } else {
      setModalTitle("Error!");
      setModalMessage("Failed to upload data!");
      setisVisible(true);
    }
  };

  const handleCloseModal = () => {
    setisVisible(false);
  };

  return (
    <div className="mycontainer overflow-y-hidden">
      <div className="h-full bg-white xl:w-1/6 flex flex-col sm:w-1/2 pt-10">
        <ListContent />
        <Divider />
      </div>
      <MessageModal
        open={isVisible}
        handleClose={handleCloseModal}
        title={modalTitle}
        message={modalMessage}
      />

      <div
        className="h-full w-full flex flex-col p-10 bg-base-300 overflow-y-scroll hide-scrollbar bg-cover bg-center"
        style={{ backgroundImage: `url(${green})` }}
      >
        <form className="flex flex-col">
          <h1 className="text-3xl pb-10 font-bold">Upload Records</h1>
          <div className="p-5 gap-5 flex">
            <TextField
              name="hid"
              label="HID"
              type="number"
              required
              value={formData.hid}
              onChange={handleChange}
              className="bg-white"
            />
          </div>
          <div className="p-5 gap-5 flex">
            <TextField
              name="title"
              id="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              className="bg-base-100"
            />
            <Select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-52 bg-white"
              required
            >
              <MenuItem value={"Document"}>Document</MenuItem>
              <MenuItem value={"Prescription"}>Prescription</MenuItem>
              <MenuItem value={"Test"}>Test</MenuItem>
            </Select>
          </div>
          <div className="p-5 gap-5 flex flex-col">
            <div className="flex flex-row items-center">
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                name="exampleCheckbox"
                color="primary"
                className="self-start"
              />
              <h1>Fields</h1>
            </div>
            {checked && (
              <>
                <TextField
                  name="subheading"
                  id="subheading"
                  label="Subheading"
                  value={formData.subheading}
                  onChange={handleChange}
                  className="bg-base-100"
                />
                <TextField
                  name="content"
                  label="Content"
                  multiline
                  rows={10}
                  value={formData.content}
                  onChange={handleChange}
                  className="bg-base-100"
                />
              </>
            )}

            <div className="flex items-center gap-3">
              <Button variant="outlined" component="label">
                Upload Record
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {imageFile && (
                <div className="flex items-center gap-2">
                  <p>{imageFile.name}</p>
                  <IconButton onClick={handleImageRemove}>
                    <Delete />
                  </IconButton>
                </div>
              )}
            </div>
            <div className="w-52">
              <Button
                variant="contained"
                component="label"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
