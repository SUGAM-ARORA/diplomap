const load = async () => {
  return {
    streamed: {
      news: new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "1",
              title: "Global Economic Summit Begins",
              description: "World leaders gather to discuss economic challenges",
              source: "World News",
              url: "#",
              publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
              category: "world",
              image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1000"
            }
            // Add more mock news items here
          ]);
        }, 100);
      })
    }
  };
};
export {
  load
};
