import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input, DropdownSection } from "@nextui-org/react";
import { carbonableProjects } from "../config";
import { useCallback, useState } from "react";

interface SearchProps {
    address: string | null;
    tokenId: string | null;
    setAddress: (address: string) => void;
    setTokenId: (tokenId: string) => void;
}

export default function SearchComponent({ address, setAddress, tokenId, setTokenId }: SearchProps) {
    // Return dropdown + inputs (conditional custom address + tokenid)
    const [displayCustom, setDisplayCustom] = useState<boolean>(false);

    const handleInput = useCallback((e: any) => {
        const n = e.target.value;
        console.log({ "input": n });
        setTokenId(n);
    }, []);

    const handleDropDownAction = (key: any) => {
        console.log({ "key": key });
        if (key === "custom") {
            setDisplayCustom(true);
        } else {
            const project = carbonableProjects.find((p) => p.name === key);
            if (project) {
                setAddress(project.address);
            }
            setDisplayCustom(false);
        }
    };

    const loadMetadataClick = () => {
        window.location.href = `/?address=${address}&tokenId=${tokenId}`;
    }

    return (<>
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">Choose Asset</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Link Actions" onAction={handleDropDownAction}>
                <DropdownSection>
                    {carbonableProjects.map((project) => (
                        <DropdownItem key={project.name}  >
                            {project.name}
                        </DropdownItem>
                    ))}
                </DropdownSection>

                <DropdownItem key={"custom"}>
                    Other assets
                </DropdownItem>

            </DropdownMenu>
        </Dropdown>

        {displayCustom && <Input placeholder={"Enter address"} onChange={(e) => setAddress(e.target.value)}></Input>}

        <Input placeholder={"Enter token id"} onChange={handleInput}></Input>
        <Button onClick={loadMetadataClick}>Load</Button>
    </>)
}