const SongGrid = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">{children}</div>
    </div>
  );
};

export default SongGrid;
