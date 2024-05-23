import { useEffect, useState } from "react";
import { fetchAbi } from "../utils/starknet";
import { useContractRead, useProvider } from "@starknet-react/core";
import { Abi, shortString } from "starknet";
import { getMetadataImage } from "../utils/metadata";
import { useAssetContext } from "./AssetProvider";

export default function TokenURI() {
    const { address, tokenId } = useAssetContext();
    const { provider } = useProvider();
    const [contractAbi, setContractAbi] = useState<Abi | undefined>(undefined);

    useEffect(() => {
        async function fetchProjectAbiWrapper() {
            const projectAbiResult = address && await fetchAbi(provider, address);
            setContractAbi(projectAbiResult);

        }
        fetchProjectAbiWrapper();
    }, [provider, address]);

    if (tokenId === null || address === null || tokenId === "null" || address === "null" || contractAbi === undefined) {
        return null;
    }

    return (
        <>
            <TokenURIResult address={address} tokenId={tokenId} contractAbi={contractAbi} />
        </>
    )

}

function TokenURIResult({ address, tokenId, contractAbi }: { address: string, tokenId: string, contractAbi: Abi}) {
    const [uri, setURI] = useState<any>(undefined);
    
    const { data, isLoading, error } = useContractRead({
        address: address,
        abi: contractAbi,
        functionName: 'token_uri',
        args: [tokenId],
        parseResult: false,
        watch: true
    });

    useEffect(() => {
        if (data === undefined) { return; }

        const array = data as Array<string>;

        array.shift();

        if (array.length > 0) {
            setURI(JSON.parse(array.map(shortString.decodeShortString).join('').replace("data:application/json,", "")));
        }

    }, [data]);
    return (
        <div className="text-left border border-opacityLight-10 rounded-lg p-4 w-full bg-opacityLight-5">
            <div className="text-lg uppercase font-light text-neutral-300">
                Your asset
            </div>
            {!isLoading && uri && !error &&
                <img className="mt-4" width="300px" src={"data:image/svg+xml;base64," + btoa(getMetadataImage(uri))} alt='' />
            }
            {isLoading && <p>Loading...</p>}
            {error && 
                <div className="mt-2 border border-red-500/50 bg-red-700 p-4 text-sm overflow-hidden text-ellipsis rounded-lg w-full">
                    Error: {error.message}
                </div>
            }
        </div>
    )
}