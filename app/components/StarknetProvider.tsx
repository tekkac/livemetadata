"use client"
import { StarknetConfig, argent, braavos, nethermindProvider, jsonRpcProvider } from "@starknet-react/core";
import { mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, rpcApiKey }: { children: React.ReactNode, rpcApiKey: string }) {
    const provider = jsonRpcProvider({
        rpc: (chain) => {
            return {
                nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7"
            }
        }
    });

    const connectors = useMemo(() => [braavos(), argent()], []);

    return (
        <StarknetConfig
            chains={[mainnet]}
            provider={provider}
            connectors={connectors}
            autoConnect={true}
        >
            {children}
        </StarknetConfig>
    );
}