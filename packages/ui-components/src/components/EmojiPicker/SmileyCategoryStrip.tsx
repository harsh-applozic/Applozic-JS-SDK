import { Box, Stack } from '@chakra-ui/layout';
import { Text, VStack } from '@chakra-ui/react';
import React, { CSSProperties } from 'react';
import { emojis, EmojiData } from './emojis';

export enum EMOJI_CATEGORY {
  SMILEYS = 'Smileys & Emotion',
  PEOPLE = 'People & Body',
  ANIMALS = 'Animals & Nature',
  FOOD = 'Food & Drink',
  TRAVEL = 'Travel & Places',
  ACTIVITY = 'Activities',
  OBJECTS = 'Objects',
  SYMBOLS = 'Symbols',
  FLAGS = 'Flags'
}

const CATEGORIES = [
  {
    category: EMOJI_CATEGORY.SMILEYS,
    emoji: '๐'
  },
  {
    category: EMOJI_CATEGORY.PEOPLE,
    emoji: '๐จโ๐ฉโ๐งโ๐ฆ'
  },
  {
    category: EMOJI_CATEGORY.ANIMALS,
    emoji: '๐ต'
  },
  {
    category: EMOJI_CATEGORY.FOOD,
    emoji: '๐'
  },
  {
    category: EMOJI_CATEGORY.ACTIVITY,
    emoji: 'โฝ'
  },
  {
    category: EMOJI_CATEGORY.TRAVEL,
    emoji: 'โ๏ธ'
  },
  {
    category: EMOJI_CATEGORY.OBJECTS,
    emoji: '๐จ๏ธ'
  },
  {
    category: EMOJI_CATEGORY.SYMBOLS,
    emoji: '๐'
  },
  {
    category: EMOJI_CATEGORY.FLAGS,
    emoji: '๐ฉ'
  }
];

type EMOJI_STRIP_CATEGORIES =
  | EMOJI_CATEGORY.SMILEYS
  | EMOJI_CATEGORY.PEOPLE
  | EMOJI_CATEGORY.ANIMALS
  | EMOJI_CATEGORY.FOOD
  | EMOJI_CATEGORY.ACTIVITY
  | EMOJI_CATEGORY.TRAVEL
  | EMOJI_CATEGORY.OBJECTS
  | EMOJI_CATEGORY.SYMBOLS
  | EMOJI_CATEGORY.FLAGS;

const EmojiCategoryMap: { [key: string]: EmojiData[] } = {};
emojis.forEach(emoji => {
  if (!EmojiCategoryMap[emoji.category]) {
    EmojiCategoryMap[emoji.category] = [];
  }
  EmojiCategoryMap[emoji.category].push(emoji);
});

interface SmileyCategoryStripProps {
  activeCategory: EMOJI_STRIP_CATEGORIES;
  onCategoryChange?: (category: EMOJI_STRIP_CATEGORIES) => void;
}

const SmileyCategoryStrip = ({
  activeCategory,
  onCategoryChange
}: SmileyCategoryStripProps) => {
  const onChange = (category: EMOJI_STRIP_CATEGORIES) => () => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };
  const boxes = CATEGORIES.map((emoji, key) => {
    return (
      <Box
        width="100%"
        key={key}
        onClick={onChange(emoji.category)}
        cursor="pointer"
      >
        <VStack width="100%" spacing={0}>
          <Text>{emoji.emoji}</Text>
          <Box
            width="100%"
            height="0"
            border="1px solid"
            borderColor={
              activeCategory === emoji.category ? 'brand.primary' : 'transparent'
            }
            borderRadius="5px"
          ></Box>
        </VStack>
      </Box>
    );
  });
  return (
    <Stack
      width={'95%'}
      direction={['column', 'row']}
      spacing="1px"
      style={{
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      {boxes}
    </Stack>
  );
};

export default SmileyCategoryStrip;
