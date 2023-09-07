import { Billboard, MovieList, Navbar } from "@/components";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  console.log(user?.name);
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending now" />
      </div>
    </>
  );
}
