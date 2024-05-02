"use client"
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import ResultWrapper from "./components/ResultWrapper";
import SearchComponent from "./components/SearchComponent";

export default function App() {


  const params = useSearchParams()
  const [address, setAddress] = useState<string | null>(params.get('address'));
  const [tokenId, setTokenId] = useState<string | null>(params.get('tokenId'));

  return (
    <>


      <SearchComponent address={address} setAddress={setAddress} tokenId={tokenId} setTokenId={setTokenId} />
      <ResultWrapper tokenId={tokenId} contractAddress={address} />
    </>
  );
}
