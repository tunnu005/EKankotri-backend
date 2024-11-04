import { Ecard } from "../models/Cards_General.js";

const SubmitForm = async (req,res) => {
  const { firstname,
    secondname,
    location,
    maindate,
    dates,
    eventname,
    invitedBy,
    photos,
    map_url } = req.body;
  console.log("reached at backend");

  let Data = new Ecard({
    firstname,
    secondname,
    location,
    maindate,
    dates,
    eventname,
    invitedBy,
    photos,
    map_url
  });
  try {
    const savedData = await Data.save();
    console.log("Response saved", savedData);
    res.status(200).json(savedData); 
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" }); 
  }
};
export default SubmitForm;