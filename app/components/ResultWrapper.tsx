import { useAssetContext } from "./AssetProvider";
import TokenURI from "./TokenURI";

export default function ResultWrapper() {
    const { address, tokenId } = useAssetContext();

    if (tokenId === null || address === null || tokenId === "null" || address === "null" || address === "" || tokenId === "") {
        return null;
    }

    return (
        <>
            <TokenURI />
        </>
    )
}