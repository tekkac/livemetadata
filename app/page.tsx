"use client";

import { AssetProvider } from "./components/AssetProvider";
import ResultWrapper from "./components/ResultWrapper";
import SearchComponent from "./components/SearchComponent";

export default function App() {

  

  return (
    <AssetProvider>
      <div>
        <SearchComponent />
      </div>
      <div className="mt-8">
        <ResultWrapper />
      </div>
    </AssetProvider>
  );
}
