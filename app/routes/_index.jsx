import { LoaderFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { OpenAI } from 'openai';
import { useEffect, useState } from 'react';
import "../css/global.css";
import { Chat35Turbo, Chat4, Chat35TurboFunctions } from "~/functions/chat"
import { ImageCreate } from "~/functions/image"

export const functions = [
  {
    "name": "get_current_weather",
    "description": "Get the current weather in a given location",
    "parameters": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string",
          "description": "The city, Aarhus, Denmark",
        },
        "unit": { "type": "string", "enum": ["celsius"] },
      },
      "required": ["location"],
    },
  }
];


export const action = async ({ request }) => {
  const formData = await request.formData();
  const text = formData.get("text");

  let { _action, ...values } = Object.fromEntries(formData)

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  if (_action === "textButton35") {
    return Chat35Turbo(openai, text);
  }

  if (_action === "textButton4") {
    return Chat4(openai, text);
  }

  if (_action === "imageButton") {
    return ImageCreate(openai, text);
  }

  if (_action === "textButton35Functions") {
    return Chat35TurboFunctions(openai, text, functions);
  }

  return null;
}

export default function Chat() {
  const data = useActionData();
  const [loading, setLoading] = useState(false);
  console.log(data);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div>
      {loading && <div className='loader'></div>}
      <Form method='post' onSubmit={handleSubmit}>
        <textarea name='text'></textarea>
        <button type='submit' name='_action' value="textButton35">Get ChatGPT Answer</button>
      </Form>
      {data?.choices?.map((d) => {
        return <p key={d.index}>{d.message.content}</p>
      })}
      <Form method='post' onSubmit={handleSubmit}>
        <textarea name='text'></textarea>
        <button type='submit' name='_action' value="imageButton">Get ChatGPT Image</button>
      </Form>
      {data && <img src={data[0]?.url} alt='image' />}
    </div>
  );
}
