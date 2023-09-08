## Setting up json server

npm i json-server

create a db.json file at root directory

the file will be following format

- db.json
  ```json
  {
    "news": [
      {
        "id": 1,
        "title": "New Study Reveals Benefits of Regular Exercise",
        "description": "A recent study conducted by experts in the field suggests that regular exercise can have numerous health benefits, including improved cardiovascular function and increased mental well-being.",
        "author": "Healthline",
        "release_date": "June 10, 2023",
        "category": "Health",
        "comment_count": 5,
        "image_url": "/images/exercise_image.jpg"
      },
      {
        "id": 2,
        "title": "Tech Company XYZ Launches Revolutionary Smartphone",
        "description": "Tech Company XYZ has unveiled its latest smartphone model, boasting cutting-edge features, a powerful processor, and an impressive camera system.",
        "author": "TechNews",
        "release_date": "June 12, 2023",
        "category": "Technology",
        "comment_count": 10,
        "image_url": "/images/company_image.jpg"
      },
      {
        "id": 3,
        "title": "SpaceX Successfully Launches Satellite into Orbit",
        "description": "SpaceX, the private space exploration company, has successfully launched a communication satellite into orbit, marking another milestone in the company's achievements.",
        "author": "Space News Today",
        "release_date": "June 15, 2023",
        "category": "Space",
        "comment_count": 15,
        "image_url": "/images/satellite_image.jpg"
      },
      {
        "id": 4,
        "title": "New Study Shows Benefits of Meditation for Stress Relief",
        "description": "A recent scientific study has found that regular meditation practice can significantly reduce stress levels and promote a sense of calm and well-being.",
        "author": "Mindfulness Magazine",
        "release_date": "June 16, 2023",
        "category": "Lifestyle",
        "comment_count": 20,
        "image_url": "/images/meditation_image.jpg"
      }
    ]
  }
  ```

now go to package.json and add following script

_"json-server"_: "json-server --watch db.json --port 5000",

then start json server

npm run json-server

it will run at port:5000

now to browser at this url: http://localhost:5000/news

# Data fetching with getStaticProps()

declare getStaticProps() function at index.js file (any file at pages folder) .

```jsx
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/news");
  const data = await res.json();
  console.log(data);
  return {
    props: {
      allNews: data,
    },
  };
};
```

then access it’s data from other function

```jsx
export const HomePage = ({ allNews }) => {
  console.log(allNews);
  return <></>;
};
```

> problems: the getStaticProps() function generates static files at build time. so if any data changes at database, the result won’t be updated at frontend.
> solution: use getServerSideProps() function instead of getStaticProps() function. it will generate static files at runtime. so if any data changes at database, the result will be updated at frontend.
