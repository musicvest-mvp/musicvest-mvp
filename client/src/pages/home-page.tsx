// client/src/pages/home-page.tsx
import React, { useEffect, useState } from "react";
import { getTracks } from "../lib/firestore";

// Define the TrackData type
export interface TrackData {
  id: string;
  title: string;
  creatorId: string;
  url: string;
  createdAt: string;
};

const HomePage: React.FC = () => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracksData = await getTracks();
        setTracks(tracksData);
      } catch (error) {
        console.error("Failed to fetch tracks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to MusicVestPro</h1>
      {loading ? (
        <p>Loading tracks...</p>
      ) : tracks.length > 0 ? (
        <ul className="mt-4">
          {tracks.map((track) => (
            <li key={track.id} className="p-2 bg-gray-700 rounded mb-2">
              {track.title} by {track.creatorId}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks available.</p>
      )}
    </div>
  );
};

export default HomePage;