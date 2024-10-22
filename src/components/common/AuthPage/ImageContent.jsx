import { AuthImage } from "../../../assets/imageList";

export default function ImageContent() {
  return (
    <div className="hidden sm:block">
      <img
        className="h-screen w-full object-cover"
        src={AuthImage}
        alt="AuthImage"
      />
    </div>
  );
}
