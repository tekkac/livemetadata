import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input } from "@nextui-org/react";
import { carbonableProjects } from "../config";
import { useCallback } from "react";

interface SearchProps {
    address: string | null;
    tokenId: string | null;
    setAddress: (address: string) => void;
    setTokenId: (tokenId: string) => void;
}

export default function SearchComponent({ address, setAddress, tokenId, setTokenId }: SearchProps) {
    // Return dropdown + inputs (conditional custom address + tokenid)

    const handleInput = useCallback((e: any) => {
        const n = e.target.value;
        setTokenId(n);
    }, []);

    const handleSelectionChange = useCallback((e: any) => {
        const n = e.target.value;
        console.log(e.target);
        // TODO
        // set address
        // change state variable display contract input
    }, []);

    const handleClick = () => {
        // Redirect to page with address and tokenid

        window.location.href = `/?address=${address}&tokenId=${tokenId}`;

    }

    return (<>
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">Choose Asset</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Link Actions" onSelectionChange={handleSelectionChange}>
                {carbonableProjects.map((project) => (
                    <DropdownItem key={project.name}>
                        {project.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        <Input placeholder={"Enter token id"} onChange={handleInput}></Input>
        <Button onClick={handleClick}>Search</Button>
    </>)
}