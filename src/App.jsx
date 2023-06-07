const concerns = useGetConcern();
const concernNames = concerns.data?.data?.map((item) => item.concernname) || [];

return (
  <div>
    {concernNames.length > 0 ? (
      concernNames.map((name) => (
        <div key={name}>{name}</div>
      ))
    ) : (
      <div>No concerns available</div>
    )}
  </div>
);
