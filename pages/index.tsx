import { NextPage } from "next";
import BaseLayout from "../components/layout/BaseLayout";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <h1 className="text-3xl font-bold underline text-black">Hello world!</h1>
    </BaseLayout>
  );
};

export default Home;
