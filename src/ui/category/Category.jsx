import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categoryImages = {
  3: '/images/categories/phones.jpg',
  5: '/images/categories/laptops.jpg',
  6: '/images/categories/accessories.jpg',
  7: '/images/categories/gaming.jpg',
};

export default function Category({ category }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  if (!category) return null;

  const categoryName =
    category.translations?.find(
      (item) => item.language === i18n.language
    )?.name ||
    category.translations?.find(
      (item) => item.language?.startsWith(i18n.language)
    )?.name ||
    category.translations?.find(
      (item) => item.language === 'en'
    )?.name ||
    category.translations?.find(
      (item) => item.language === 'ar'
    )?.name ||
    category.name ||
    `Category ${category.id}`;

  const categoryImage =
    categoryImages[category.id] ||
    '/images/categories/accessories.jpg';

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/categories/${category.id}`)}
        sx={{ height: '100%' }}
      >
        <Box
          component="img"
          src={categoryImage}
          alt={categoryName}
          loading="lazy"
          sx={{
            width: '100%',
            height: 190,
            objectFit: 'cover',
            display: 'block',
          }}
        />

        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            textAlign="center"
          >
            {categoryName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}