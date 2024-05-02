import TokenURI from "./TokenURI";

export interface ResultWrapperProps {
    contractAddress: string | null;
    tokenId: string | null
}

export default function ResultWrapper(params: ResultWrapperProps) {
    if (params.tokenId === null || params.contractAddress === null) {
        return null;
    }

    return (
        <>
            <TokenURI
                contractAddress={params.contractAddress}
                tokenId={params.tokenId}
            />
        </>
    )
}