import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, DropdownSection } from "@nextui-org/react";
import { carbonableProjects, customProject } from "../config";
import { useEffect, useState } from "react";
import { Project } from "../types/types";
import { useAssetContext } from "./AssetProvider";

export default function SearchComponent() {
    const { address, setAddress, setTokenId, tokenId } = useAssetContext();
    const [projects, setProjects] = useState<Project[]>(carbonableProjects);
    const [displayCustom, setDisplayCustom] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
    const [formAddress, setFormAddress] = useState<string>(address ? address : "");
    const [formTokenId, setFormTokenId] = useState<string>(tokenId ? tokenId : "");

    useEffect(() => {
        if (address === null) return;

        setSelectedProject(projects.find((p) => p.address === address));
    }, []);

    const handleDropDownAction = (key: any) => {
        if (key === "custom") {
            setDisplayCustom(true);
            setFormAddress("");
            setFormTokenId("");
            setSelectedProject(customProject);
            // TODO: add collection in the project list
        } else {
            const project = projects.find((p) => p.name === key);
            if (project) {
                setAddress(project.address);
                setFormAddress(project.address);
                setSelectedProject(project);
                setFormTokenId("");
                setTokenId(null);
            }
            setDisplayCustom(false);
        }
    };

    const loadMetadataClick = () => {
        window.location.href = `/?address=${formAddress}&tokenId=${formTokenId}`;
    }

    return (
        <div className="text-left">
            <div className="border border-opacityLight-10 rounded-lg p-4 w-full bg-opacityLight-5">
                <div className="text-lg uppercase font-light text-neutral-300">
                    Select an asset
                </div>
                <div className="mt-4">
                    <Dropdown>
                        <DropdownTrigger>
                            <button className="border border-opacityLight-20 rounded-lg outline-none py-2 px-4 flex items-center">
                                <div>
                                    {!selectedProject?.name ? 'Choose Asset' : selectedProject.name}
                                </div>
                                <div className="text-xl text-neutral-300 ml-4 mb-3">
                                    &#8964;
                                </div>
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" className="z-50 bg-neutral-800 p-4 rounded-lg border border-opacityLight-10 flex flex-nowrap" aria-label="Link Actions" onAction={handleDropDownAction}>
                            <DropdownSection title="Carbonable assets" className="text-xs font-bold text-neutral-300 pt-2 pr-8">
                                {projects.map((project) => (
                                    <DropdownItem key={project.name} className="cursor-pointer hover:bg-opacityLight-20 py-2 px-4 text-base font-normal text-neutral-100 rounded-md">
                                        {project.name}
                                    </DropdownItem>
                                ))}
                            </DropdownSection>
                            <DropdownSection title="Other assets" className="text-xs font-bold text-neutral-300 mt-2">
                                <DropdownItem key={customProject.name} className="cursor-pointer hover:bg-opacityLight-20 py-2 px-4 text-base font-normal text-neutral-100 rounded-md">
                                    Other assets
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {selectedProject !== undefined &&
                <>
                    <div className="mt-4 border border-opacityLight-10 rounded-lg p-4 w-full bg-opacityLight-5">
                        <div className="text-lg uppercase font-light text-neutral-300">
                            Asset details
                        </div>
                        <div className="mt-4">
                            <InputsComponents
                                displayCustom={displayCustom}
                                address={formAddress}
                                setAddress={setFormAddress}
                                tokenId={formTokenId}
                                setTokenId={setFormTokenId}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            disabled={
                                formTokenId === null ||
                                formTokenId === "" ||
                                formAddress === null ||
                                formAddress === ""
                            }
                            className="bg-greenish-500 rounded-lg py-2 px-4 w-full disabled:bg-greenish-700 disabled:text-neutral-300 disabled:cursor-not-allowed" onClick={loadMetadataClick}>Load</button>
                    </div>
                </>
            }
        </div>
    )
}

function InputsComponents({ displayCustom, address, setAddress, tokenId, setTokenId }: { displayCustom: boolean, address: string, setAddress: (address: string) => void, tokenId: string, setTokenId: (tokenId: string) => void }) {
    const className = "rounded-lg px-4 py-2 text-neutral-900 w-11/12 mt-1";

    return (
        <>
            <div>
                <div className="text-neutral-300 text-sm">Address</div>
                <input
                    disabled={displayCustom === false}
                    className={className}
                    value={address ? address : ""}
                    placeholder={"Enter address"}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <div className="text-neutral-300 text-sm">Token ID</div>
                <input
                    className={className}
                    placeholder={"Enter token id"}
                    value={tokenId ? tokenId : ""}
                    onChange={(e) => setTokenId(e.target.value)} />
            </div>
        </>
    )
}