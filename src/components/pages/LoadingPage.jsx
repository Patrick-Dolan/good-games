import Surface from "../layout/Surface";

function LoadingPage() {
  return (
    <div className="container">
      <Surface elevation="elevation-1">
        <h1 className="text-center">Loading...</h1>
        {/* TODO add loading animation */}
      </Surface>
    </div>
  );
};

export default LoadingPage;
