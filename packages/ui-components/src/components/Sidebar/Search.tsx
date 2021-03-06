import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { HStack, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import MotionBox from '../MotionBox';
import { AnimatePresence } from 'framer-motion';
import Icon from '../Icon';

export interface SearchProps {
  /** Show the hamburger on the left to collapse the sidebar */
  hideHamburger?: boolean;
  /** Search query to filter the sidebar items */
  searchValue: string | undefined;
  /** Callback to update the search query */
  setSearchValue: (query: string) => void;
  /** The current collapsed state of the sidebar */
  isCollapsed: boolean;
  /** Callback to toggle the collapsed or expanded state of the sidebar */
  setCollapsed: (state: boolean) => void;
}

function Search({
  hideHamburger,
  searchValue,
  setSearchValue,
  setCollapsed,
  isCollapsed
}: SearchProps) {
  return (
    <HStack alignItems="center" justifyContent="center" width="full">
      {!hideHamburger && (
        <HamburgerIcon
          onClick={() => setCollapsed && setCollapsed(!isCollapsed)}
        />
      )}
      <AnimatePresence>
        {!isCollapsed && (
          <MotionBox
            exit="closed"
            animate="open"
            width="full"
            variants={{
              open: { opacity: 1, flex: 1 },
              closed: { opacity: 0, flex: 0 }
            }}
            transition={{ type: 'tween' }}
          >
            <InputGroup width="full">
              <InputLeftElement pointerEvents="none">
                <Icon icon="search" color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={e =>
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
