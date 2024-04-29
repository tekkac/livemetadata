"use client"
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input } from "@nextui-org/react";
import { carbonableProjects } from "./config";
import { useCallback, useEffect, useState } from "react";
import { useContractRead, useProvider } from "@starknet-react/core";
import { useSearchParams } from 'next/navigation'
import { fetchAbi } from "./utils/starknet";
import { shortString } from "starknet";

export default function App() {
  const [contractAbi, setContractAbi] = useState<any>(undefined);
  const [tokenID, setTokenID] = useState<number>(0);
  const [uri, setURI] = useState<any>(undefined);
  const { provider } = useProvider();
  const params = useSearchParams()
  const address = params.get('address')
  const tokenId = params.get('tokenId')

  useEffect(() => {
    async function fetchProjectAbiWrapper() {
      const projectAbiResult = address && await fetchAbi(provider, address);
      setContractAbi(projectAbiResult);

    }
    fetchProjectAbiWrapper();
  }, [provider, address]);

  const { data, isLoading, error } = useContractRead({
    address: address || undefined,
    abi: contractAbi,
    functionName: 'token_uri',
    args: [tokenId || 0],
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

  const handleInput = useCallback((e: any) => {
    const n = e.target.value;
    setTokenID(n);
  }, []);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Choose Asset</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Link Actions">
          {carbonableProjects.map((project) => (
            <DropdownItem key={project.name} href={`/?address=${project.address}&tokenId=${tokenID}`}>
              {project.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Input placeholder={"Enter token id"} onChange={handleInput}></Input>
      {!isLoading && uri &&
        <img height="90" src={"data:image/svg+xml;base64," + btoa(getMetadataImage(uri))} alt='' />}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </>
  );
}

const getMetadataImage = (data: any) => {
  if (data === undefined) { return; }

  let image_data;
  if (data.hasOwnProperty('image')) {
    image_data = data.image;
  }
  if (data.hasOwnProperty('image_data')) {
    image_data = data.image_data;
  }
  return image_data;
}