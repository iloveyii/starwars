import path from "path";

// Resolve paths
export const VIDEOS_DIR = "videos";
export const VIDEOS_DIR_PATH = path.resolve(
  __dirname,
  "../",
  "public",
  VIDEOS_DIR
);
export const IMAGES_DIR = "images";
export const IMAGES_DIR_PATH = path.resolve(
  __dirname,
  "../",
  "public",
  IMAGES_DIR
);
