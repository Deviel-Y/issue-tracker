import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Metadata } from "next";

const CreateNewPage = async () => {
  const IssueForm = dynamic(
    () => import("@/app/issues/_components/IssueForm"),
    {
      ssr: false,
      loading: () => <IssueFormSkeleton />,
    }
  );

  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Create New Issue",
  description: "Here you can create new issues",
};

export default CreateNewPage;
