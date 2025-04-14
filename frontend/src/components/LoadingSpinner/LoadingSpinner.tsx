import { ColorRing } from "react-loader-spinner";
import c from "./LoadingSpinner.module.css";

export const LoadingSpinner = () => {
  return (
    <div className={c.spinnerWrapper}>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};
