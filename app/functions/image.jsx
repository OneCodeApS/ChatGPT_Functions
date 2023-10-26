export async function ImageCreate(openai, text){
    const response = await openai.images.generate({
        prompt: `${text}`,
        n: 1,
        size: "512x512"
      })
  
      return response.data;
}