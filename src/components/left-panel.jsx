import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Fuse from "fuse.js";

// Components
import { ChatList } from "./chat-list";
import { Header } from "./header";
import { SearchPanel } from "./search-panel";
import { chatData } from "../chat-data";

export function LeftPanel(props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(search);
  }, [search]);

  const options = {
    includeScore: true,
    keys: ["name", "message"],
  };
  const fuse = new Fuse(chatData, options);
  const result = fuse.search(search);

  const chatDataResult = search ? result.map((data) => data.item) : chatData;

  return (
    <Flex direction="column" w="30%" {...props}>
      <Box>
        <Header />
        <SearchPanel onChange={(e) => setSearch(e.target.value)} />
      </Box>
      <ChatList flex="1" overflow="auto" chatData={chatDataResult} />
    </Flex>
  );
}
