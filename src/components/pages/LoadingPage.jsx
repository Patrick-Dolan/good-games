import LoadingAnimation from "../../assets/LoadingAnimation";
import Surface from "../layout/Surface";

function LoadingPage() {
  return (
    <div className="container">
      <Surface elevation="elevation-1">
        <LoadingAnimation />
        <h1 className="text-center">Loading...</h1>
      </Surface>
    </div>
  );
};

export default LoadingPage;
