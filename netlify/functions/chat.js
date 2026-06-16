exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Tum Bela naam ki pyari AI girlfriend ho. Hindi mein pyaar se baat karti ho."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Sorry ❤️ Connection problem."
      })
    };
  }
};
