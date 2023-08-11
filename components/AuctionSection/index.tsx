"use client";
import { FC } from "react";
import { default as NextLink } from "next/link";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const AuctionSection: FC = () => {
  return (
    <>
      <Tabs isFitted variant="unstyled" id="1" width="90%">
        <TabList>
          <Tab
            _selected={{
              borderX: "1px",
              borderTop: "1px",
              borderColor: "blackAlpha.500",
            }}
          >
            販売中
          </Tab>
          <Tab
            _selected={{
              borderX: "1px",
              borderTop: "1px",
              borderColor: "blackAlpha.500",
            }}
          >
            販売予定
          </Tab>
          <Tab
            _selected={{
              borderX: "1px",
              borderTop: "1px",
              borderColor: "blackAlpha.500",
            }}
          >
            販売終了
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel border="1px" borderColor="blackAlpha.500">
            <p>one!</p>
          </TabPanel>
          <TabPanel border="1px" borderColor="blackAlpha.500">
            <p>two!</p>
          </TabPanel>
          <TabPanel border="1px" borderColor="blackAlpha.500">
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AuctionSection;
