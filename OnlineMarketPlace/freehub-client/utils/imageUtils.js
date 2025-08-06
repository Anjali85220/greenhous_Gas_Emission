// src/utils/imageUtils.js
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Handle paths from backend
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  // Remove any leading slashes to ensure consistent paths
  const cleanPath = imagePath.replace(/^\/+/, '');
  
  // Check if path already includes 'uploads/gigs'
  if (cleanPath.startsWith('uploads/gigs/')) {
    return `${baseUrl}/${cleanPath}`;
  }
  
  // Default path for gig images
  return `${baseUrl}/uploads/gigs/${cleanPath}`;
};