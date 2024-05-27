export const uploadData = async (data) => {
  console.log(data);
  try {
    const response = await fetch("https://emr.modo-dev.com/addrecord", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const result = await response.text();
    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
