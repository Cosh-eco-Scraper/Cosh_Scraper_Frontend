import axiosInstance from '@/axiosInstance';


const getAllStatements = async () => {
  try {
    const response = await axiosInstance.get('statements');
    return response.data;
  } catch (error) {
    console.error('Error fetching all statements:', error);
    throw error;
  }
};

const StatementService = {
  getAllStatements,
};

export default StatementService;
