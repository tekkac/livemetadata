"use client"
import { StarknetConfig, argent, braavos, nethermindProvider, publicProvider } from "@starknet-react/core";
import { mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, rpcApiKey }: { children: React.ReactNode, rpcApiKey: string }) {
    // const provider = nethermindProvider({ apiKey: rpcApiKey });
    const provider = publicProvider();
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