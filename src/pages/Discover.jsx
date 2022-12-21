import { useSelector, useDispatch } from "react-redux";

import { Select } from "@mantine/core";

import { Error, Loader, SongCard, SongGrid } from "../components";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { genres } from "../assets/constants";

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-between w-full mt-4 mb-10 sm:flex-row">
        <h2 className="text-3xl font-bold text-left text-white">
          Discover {genreTitle}
        </h2>

        <Select
          placeholder="Select genre"
          value={genreListId || "POP"}
          onChange={(string) => dispatch(selectGenreListId(string))}
          data={genres.map((genre) => ({
            value: genre.value,
            label: genre.title,
          }))}
          styles={{
            item: {
              // applies styles to selected item
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor: "#2C5364",
                  color: "#fff",
                },
              },

              // applies styles to hovered item (with mouse or keyboard)
              "&[data-hovered]": {
                "&, &:hover": {
                  backgroundColor: "#2C5364",
                  color: "#fff",
                },
              },
            },
          }}
          classNames={{
            input:
              "bg-black focus:border-transparent border-transparent text-white",
            dropdown: "bg-black border-transparent",
            item: "text-white",
          }}
        />
      </div>

      <SongGrid>
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </SongGrid>
    </div>
  );
};

export default Discover;
