import FavoritesContent from "@/components/profile/favorites/FavoritesContent";

// The profile layout waits for browser-stored authentication before rendering
// this page, so its initial UI cannot be validated as an instant navigation.
export const instant = false;

export default function FavoritesPage() {
  return <FavoritesContent />;
}
