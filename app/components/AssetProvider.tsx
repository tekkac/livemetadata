"use client";

import { useSearchParams } from 'next/navigation';
import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

type AssetContextType = {
  address: string | null;
  setAddress: (address: string | null) => void;
  tokenId: string | null;
  setTokenId: (tokenId: string | null) => void;
};

const AssetContext = createContext<AssetContextType>({} as AssetContextType);

interface Props {
  children: ReactNode;
}

export const AssetProvider: FC<Props> = ({ children }) => {
  const params = useSearchParams()
  const [address, setAddress] = useState<string | null>(params.get('address'));
  const [tokenId, setTokenId] = useState<string | null>(params.get('tokenId'));

  return (
    <AssetContext.Provider
      value={{
        address,
        setAddress,
        tokenId,
        setTokenId,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = () => useContext(AssetContext);