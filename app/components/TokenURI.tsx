import { useEffect, useState } from "react";
import { fetchAbi } from "../utils/starknet";
import { useContractRead, useProvider } from "@starknet-react/core";
import { shortString } from "starknet";
import { getMetadataImage } from "../utils/metadata";

export interface TokenURIProps {
    contractAddress: string;
    tokenId: string;
}

export default function TokenURI({ contractAddress, tokenId }: TokenURIProps) {
    const { provider } = useProvider();
    const [contractAbi, setContractAbi] = useState<any>(undefined);
    const [uri, setURI] = useState<any>(undefined);

    useEffect(() => {
        async function fetchProjectAbiWrapper() {
            const projectAbiResult = contractAddress && await fetchAbi(provider, contractAddress);
            setContractAbi(projectAbiResult);

        }
        fetchProjectAbiWrapper();
    }, [provider, contractAddress]);

    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
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
        <>
            {
                !isLoading && uri &&
                <img width="300px" src={"data:image/svg+xml;base64," + btoa(getMetadataImage(uri))} alt='' />
            }
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </>
    )

}