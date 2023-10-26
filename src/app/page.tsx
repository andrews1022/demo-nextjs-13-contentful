import { client } from "@/contentful/client";
import type { EntryFieldTypes } from "contentful";

type ProjectSkeleton = {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
  };
};

const getProjectsRest = async () => {
  const entries = await client.getEntries<ProjectSkeleton>({
    content_type: "project"
  });

  if (!entries) {
    throw new Error("No entries found");
  }

  return entries;
};

const gql = String.raw;

const getProjctsGraphql = async () => {
  const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      query: gql`
        query HomepageQuery {
          projectCollection {
            items {
              sys {
                id
              }
              title
            }
          }
        }
      `
    })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from Contentful");
  }

  const data = await res.json();
  console.log("data: ", data);

  return data;
};

const HomePage = async () => {
  const projectsRest = await getProjectsRest();

  const projectsGraphql = await getProjctsGraphql();

  return (
    <div>
      <h1>HomePage</h1>

      {/* {projects.items.map((project) => (
        <div key={project.sys.id}>{project.fields.title}</div>
      ))} */}
    </div>
  );
};

export default HomePage;
