import { client } from "@/contentful/client";
import type { EntryFieldTypes } from "contentful";

type ProjectSkeleton = {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
  };
};

const getProjects = async () => {
  const entries = await client.getEntries<ProjectSkeleton>({
    content_type: "project"
  });

  if (!entries) {
    throw new Error("No entries found");
  }

  return entries;
};

const HomePage = async () => {
  const projects = await getProjects();

  return (
    <div>
      <h1>HomePage</h1>

      {projects.items.map((project) => (
        <div key={project.sys.id}>{project.fields.title}</div>
      ))}
    </div>
  );
};

export default HomePage;
