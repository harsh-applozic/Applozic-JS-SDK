import React, { useEffect, useState } from "react";
import { HamburgerIcon, SearchIcon, WarningIcon } from "@chakra-ui/icons";
import {
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import MotionBox from "../MotionBox";
import { AnimatePresence } from "framer-motion";
import Icon from "../Icon";

export interface SearchProps {
  searchValue: string | undefined;
  setSearchValue: (query: string) => void;
  setCollapsed: (state: boolean) => void;
  isCollapsed: boolean;
}

function Search({
  searchValue,
  setSearchValue,
  setCollapsed,
  isCollapsed,
}: SearchProps) {
  return (
    <HStack alignItems="center" justifyContent="center" width="full">
      <HamburgerIcon
        onClick={() => setCollapsed && setCollapsed(!isCollapsed)}
      />
      <AnimatePresence>
        {!isCollapsed && (
          <MotionBox
            exit="closed"
            animate="open"
            width="full"
            variants={{
              open: { opacity: 1, flex: 1 },
              closed: { opacity: 0, flex: 0 },
            }}
            transition={{ type: "tween" }}
          >
            <InputGroup width="full">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon icon="search" color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) =>
                  setSearchValue && setSearchValue(e.target.value.toString())
                }
              />
            </InputGroup>
          </MotionBox>
        )}
      </AnimatePresence>
    </HStack>
  );
}

export default Search;
