import HighestRatedGames from "../discovery/HighestRatedGames";

function DiscoverPage() {
  // TODO add api call that displays games in cards
  // API Calls should use the pageNumber query for firestore and have state that will update the pageNumber
  // Limit for each request should be 40 games then have a loading button that will load more results using next page number

  return (
    <div className="container">
      <HighestRatedGames />
    </div>
  );
};

export default DiscoverPage;
