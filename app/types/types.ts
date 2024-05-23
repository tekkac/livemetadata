export interface TokenURIProps {
    contractAddress: string | null;
    tokenId: string | null
}

export interface Project {
    name: string;
    address: string;
    slot: number | null;
    type: string;
}