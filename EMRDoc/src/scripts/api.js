export const uploadData = async (data) => {
  console.log(data);
  //   return;
  fetch("https://emr.modo-dev.com/addrecord", {
    method: "POST",
    body: data,
  })
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      console.log(await response.text());
    })
    .catch((error) => {
      console.error(error);
    });
};
