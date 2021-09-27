import { no_image_available } from "./ImagePath";

export const handleImageError = (e) => {
  return (e.target.src = no_image_available);
};
