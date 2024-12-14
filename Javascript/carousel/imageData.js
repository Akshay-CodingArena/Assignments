const imageData = async () => {
  try {
    const url = "https://dummyjson.com/recipes";
    const res = await fetch(url).then((res) => res.json());
    return { data: res.recipes };
  } catch {
    return { error: "Something went wrong" };
  }
  // const images = res.map((image) => image.url);
};

export { imageData };
