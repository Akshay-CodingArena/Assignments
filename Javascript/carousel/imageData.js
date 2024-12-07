const imageData = async () => {
    const url = "https://dummyjson.com/recipes";
    const res = await fetch(url).then(res=>res.json())
    return res.recipes
   // const images = res.map((image) => image.url);
  };

export {imageData}