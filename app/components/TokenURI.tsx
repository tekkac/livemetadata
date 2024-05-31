import { useEffect, useState } from "react";
import { fetchAbi } from "../utils/starknet";
import { useContractRead, useProvider } from "@starknet-react/core";
import { Abi, shortString } from "starknet";
import { getMetadataJson, getMetadataImage } from "../utils/metadata";
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

function TokenURIResult({ address, tokenId, contractAbi }: { address: string, tokenId: string, contractAbi: Abi }) {
    const [uri, setURI] = useState<any>(undefined);
    const [fetchedImage, setFetchedImage] = useState<any>(undefined);
    const [readableError, setReadableError] = useState<string | null>(null);

    const { data, isLoading, error } = useContractRead({
        address: address,
        abi: contractAbi,
        functionName: 'token_uri',
        args: [tokenId],
        parseResult: false,
        watch: true
    });

    useEffect(() => {
        const fetchData = async () => {
            if (data === undefined) { return; }

            const array = data as Array<string>;

            array.shift();

            if (array.length > 0) {
                let dataString = array.map(shortString.decodeShortString).join('');
                let metadataJson = await getMetadataJson(dataString);
                let image = await getMetadataImage(metadataJson);
                console.log(metadataJson);
                setURI(metadataJson);
                setFetchedImage(image);
            }
        }
        fetchData();

    }, [data]);

    useEffect(() => {
        if (error === null) {
            setReadableError(null);
            return;
        }

        const regex = /Failure reason: 0x(?:\w+) \('([^']+)'\)/;
        const match = error.message.match(regex);

        if (match && match.length > 1) {
            setReadableError(match[1]);
        } else {
            setReadableError(error.message);
        }

    }, [error]);
    return (
        <div className="text-left border border-opacityLight-10 rounded-lg p-4 w-full bg-opacityLight-5">
            <div className="text-lg uppercase font-light text-neutral-300">
                Your asset
            </div>
            {!isLoading && uri && !error &&
                <img className="mt-4" width="300px" src={fetchedImage} alt='' />
            }
            {isLoading && <p>Loading...</p>}
            {readableError &&
                <div className="mt-2 border border-red-500/50 bg-red-700 p-4 overflow-hidden whitespace-normal break-words rounded-lg w-full">
                    <div>{readableError}</div>
                    <div className="mt-2 text-sm">
                        <p className="underline">Full trace:</p>
                        <p>{error?.message}</p>
                    </div>
                </div>
            }
        </div>
    )
}