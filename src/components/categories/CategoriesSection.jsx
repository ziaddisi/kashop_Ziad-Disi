import { CircularProgress, Typography } from '@mui/material';
import useCategories from '../../hooks/useCategories';


export default function CategoriesSection() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useCategories();

  if (isLoading) {
    return <Typography>جاري تحميل الأقسام...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error">
        فشل تحميل الأقسام: {error.message}
      </Typography>
    );
  }

  const categories = data?.response?.data || [];

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          {category.name}
        </div>
      ))}
    </>
  );
}