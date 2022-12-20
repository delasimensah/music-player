import { ArtistCard, Error, Loader, SongGrid } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">
        Top artists
      </h2>

      <SongGrid>
        {data?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </SongGrid>
    </div>
  );
};

export default TopArtists;
